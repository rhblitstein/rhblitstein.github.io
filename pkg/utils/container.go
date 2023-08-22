package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	ForceUnhealthy bool
)

// HealthCheck returns 200 for good health, or 503 when forced to.
func HealthCheck(c *gin.Context) {
	if ForceUnhealthy {
		c.Status(http.StatusServiceUnavailable)
		return
	}

	c.Status(http.StatusOK)
}
