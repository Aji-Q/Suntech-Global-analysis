// Suntec REIT Global Competitive Analysis - Professional Financial Dashboard
// Strictly based on original text data only

// 确保JavaScript正确加载
console.log('Suntec Analysis JavaScript loaded successfully');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // 测试语言按钮是否存在
    const testButtons = document.querySelectorAll('.language-btn');
    console.log('Language buttons found:', testButtons.length);
    testButtons.forEach((btn, i) => {
        console.log(`Button ${i}:`, btn.textContent, btn.getAttribute('data-lang'));
    });

    // Language switching functionality
    const languageButtons = document.querySelectorAll('.language-btn');
    const body = document.body;

    console.log('Found language buttons:', languageButtons.length); // 调试信息

    languageButtons.forEach((button, index) => {
        console.log(`Button ${index}:`, button.textContent, button.getAttribute('data-lang')); // 调试信息
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const lang = this.getAttribute('data-lang');
            console.log('Language switch clicked:', lang, this.textContent); // 调试信息
            
            // Update active button
            languageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update body class - 修复逻辑
            if (lang === 'zh') {
                body.classList.add('lang-zh');
                console.log('Added lang-zh class to body'); // 调试信息
            } else if (lang === 'en') {
                body.classList.remove('lang-zh');
                console.log('Removed lang-zh class from body'); // 调试信息
            }
            
            // Update chart labels
            updateChartLabels(lang);
            
            // Force a small delay to ensure DOM updates
            setTimeout(() => {
                console.log('Language switch completed'); // 调试信息
            }, 100);
        });

        // 添加鼠标事件监听器作为备用
        button.addEventListener('mousedown', function(e) {
            console.log('Mouse down on button:', this.textContent); // 调试信息
        });
    });

    // Update chart labels based on language
    function updateChartLabels(lang) {
        const charts = Chart.instances;
        if (charts && Array.isArray(charts)) {
            charts.forEach(chart => {
                if (chart && chart.config && chart.config.type === 'doughnut' && chart.canvas && chart.canvas.id === 'portfolioChart') {
                    chart.data.labels = lang === 'zh' 
                        ? ['新加坡 (77.9%)', '澳大利亚 (12.4%)', '英国 (9.7%)']
                        : ['Singapore (77.9%)', 'Australia (12.4%)', 'UK (9.7%)'];
                    chart.update();
                }
            });
        }
    }

    // Chart.js global configuration for dark theme
    Chart.defaults.color = '#b0b0b0';
    Chart.defaults.borderColor = '#404040';
    Chart.defaults.plugins.legend.labels.color = '#b0b0b0';

    // Portfolio Distribution Chart
    const portfolioCtx = document.getElementById('portfolioChart');
    if (portfolioCtx) {
        new Chart(portfolioCtx, {
            type: 'doughnut',
            data: {
                labels: ['Singapore (77.9%)', 'Australia (12.4%)', 'UK (9.7%)'],
                datasets: [{
                    data: [77.9, 12.4, 9.7],
                    backgroundColor: [
                        '#00d4aa',
                        '#ff6b35', 
                        '#3742fa'
                    ],
                    borderWidth: 2,
                    borderColor: '#2a2a2a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            color: '#b0b0b0'
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });
    }

    // Asia Market Share Chart
    const asiaMarketShareCtx = document.getElementById('asiaMarketShareChart');
    if (asiaMarketShareCtx) {
        new Chart(asiaMarketShareCtx, {
            type: 'bar',
            data: {
                labels: ['CICT', 'Suntec REIT', 'MCT', 'Dexus', 'Mirvac'],
                datasets: [{
                    label: 'Market Share (%)',
                    data: [10, 5, 4, 10, 8],
                    backgroundColor: [
                        '#ff4757',
                        '#00d4aa',
                        '#ff6b35',
                        '#3742fa',
                        '#8b5cf6'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 12,
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0'
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });
    }

    // Asia Growth Chart
    const asiaGrowthCtx = document.getElementById('asiaGrowthChart');
    if (asiaGrowthCtx) {
        new Chart(asiaGrowthCtx, {
            type: 'line',
            data: {
                labels: ['Suntec REIT', 'CICT', 'MCT', 'Dexus', 'Mirvac'],
                datasets: [{
                    label: 'Revenue Growth (%)',
                    data: [1.4, 3.2, 2.8, 1.8, 2.1],
                    borderColor: '#00d4aa',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00d4aa',
                    pointBorderColor: '#2a2a2a',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 4,
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0'
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });
    }

    // UK Market Share Chart
    const ukMarketShareCtx = document.getElementById('ukMarketShareChart');
    if (ukMarketShareCtx) {
        new Chart(ukMarketShareCtx, {
            type: 'pie',
            data: {
                labels: ['Landsec', 'British Land', 'Suntec REIT', 'Others'],
                datasets: [{
                    data: [5, 4, 0.5, 90.5],
                    backgroundColor: [
                        '#ff4757',
                        '#00d4aa',
                        '#3742fa',
                        '#404040'
                    ],
                    borderWidth: 2,
                    borderColor: '#2a2a2a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            color: '#b0b0b0'
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });
    }

    // UK Performance Chart
    const ukPerformanceCtx = document.getElementById('ukPerformanceChart');
    if (ukPerformanceCtx) {
        new Chart(ukPerformanceCtx, {
            type: 'bar',
            data: {
                labels: ['Landsec', 'British Land', 'Suntec REIT'],
                datasets: [{
                    label: 'Revenue Growth (%)',
                    data: [2.5, 1.9, -2.0],
                    backgroundColor: [
                        '#00d4aa',
                        '#00d4aa',
                        '#ff4757'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0'
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });
    }

    // US Market Share Chart
    const usMarketShareCtx = document.getElementById('usMarketShareChart');
    if (usMarketShareCtx) {
        new Chart(usMarketShareCtx, {
            type: 'bar',
            data: {
                labels: ['Boston Properties', 'Vornado', 'Suntec REIT'],
                datasets: [{
                    label: 'US Office REIT Market Share (%)',
                    data: [3, 2, 0],
                    backgroundColor: [
                        '#00d4aa',
                        '#ff6b35',
                        '#404040'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 4,
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0'
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });
    }

    // Global Investor Competition Chart
    const globalInvestorCtx = document.getElementById('globalInvestorChart');
    if (globalInvestorCtx) {
        new Chart(globalInvestorCtx, {
            type: 'line',
            data: {
                labels: ['Suntec REIT', 'Boston Properties', 'Vornado'],
                datasets: [{
                    label: 'Revenue Growth (%)',
                    data: [1.4, 1.5, 1.2],
                    borderColor: '#00d4aa',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00d4aa',
                    pointBorderColor: '#2a2a2a',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 2,
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0'
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            const targetId = this.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    });

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add hover effects for metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(0, 212, 170, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add responsive behavior for charts
    function resizeCharts() {
        const charts = Chart.instances;
        if (charts && Array.isArray(charts)) {
            charts.forEach(chart => {
                if (chart && typeof chart.resize === 'function') {
                    chart.resize();
                }
            });
        }
    }

    window.addEventListener('resize', resizeCharts);

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Add professional loading effect
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 