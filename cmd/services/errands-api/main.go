package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"rhblitstein.github.io/pkg/utils"
)

func main() {
	logger, err := zap.NewProduction()
	if err != nil {
		log.Fatal("can't initialize zap logger: ", err)
	}
	defer func() {
		err := logger.Sync()
		if err != nil {
			log.Println(err)
		}
	}()

	logger.Info("Initializing middleware")
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(gin.Recovery())

	logger.Info("Initializing routes")
	r.GET("/health", utils.HealthCheck)

	srv := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	logger.Info("Starting http server...")
	go func() {
		logger.Info("Server listening on port 8080")
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("http server failed", zap.Error(err))
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Minute)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		logger.Fatal("http server forced to shutdown", zap.Error(err))
	}
	logger.Warn("Service stopped.")
}
