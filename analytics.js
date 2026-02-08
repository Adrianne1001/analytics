
  //filters
  window.onload = function() {
    var filtersContainer = document.getElementById("filtersContainer");
    filtersContainer.style.display = "none"; // Start with filters hidden
  };
  
  function toggleFilters() {
    var filtersContainer = document.getElementById("filtersContainer");
    var toggleFiltersButton = document.getElementById("toggleFiltersButton");
    var filterIcon = toggleFiltersButton.querySelector("i.bx-filter-alt");
  
    if (filtersContainer.style.display === "none") {
      filtersContainer.style.display = "flex";
      filterIcon.style.display = "inline";
      toggleFiltersButton.innerHTML = "Hide Filters <i class='bx bx-filter-alt'></i>";
    } else {
      filtersContainer.style.display = "none";
      filterIcon.style.display = "inline";
      toggleFiltersButton.innerHTML = "Show Filters <i class='bx bx-filter-alt'></i>";
    }
  }
    
    function filterDataDate() {
      // Implement filtering logic for date
    }
    
    function filterDataSpecies() {
      // Implement filtering logic for species
    }
    
    function filterDatameatEstablishment() {
      // Implement filtering logic for meat establishment
    }


//Calendar Restrictions
document.addEventListener("DOMContentLoaded", function() {
    const startDateInput = document.getElementById("startdate");
    const endDateInput = document.getElementById("enddate");
  
    // Get the current date
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
  
    // Set the maximum date for the inputs as the current date
    startDateInput.max = currentDateString;
    endDateInput.max = currentDateString;
  
    startDateInput.addEventListener("change", updateEndDateRestriction);
    endDateInput.addEventListener("change", updateStartDateRestriction);
  
    function updateEndDateRestriction() {
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);
  
      // Check if the selected start date is later than the current date
      if (startDate > currentDate) {
        startDateInput.value = currentDateString;
      }
  
      // Set the minimum date for the end date input
      endDateInput.min = startDateInput.value;
  
      // Check if the selected end date is later than the current date
      if (endDate > currentDate) {
        endDateInput.value = currentDateString;
      }
  
      // Check if the selected start date is later than the selected end date
      if (startDate > endDate) {
        endDateInput.value = startDateInput.value;
      }
    }
  
    function updateStartDateRestriction() {
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);
  
      // Check if the selected end date is later than the current date
      if (endDate > currentDate) {
        endDateInput.value = currentDateString;
      }
  
      // Set the maximum date for the start date input
      startDateInput.max = endDateInput.value;
  
      // Check if the selected start date is later than the selected end date
      if (startDate > endDate) {
        startDateInput.value = endDateInput.value;
      }
    }
  });
  

  

//Meat Qty Area chart JS with darkmode
let areaChart;
let labelColor = localStorage.getItem('labelColor') || labelColorDark;

renderChart(labelColor, labelColor);

switchMode.addEventListener('change', function () {
    if (areaChart) {
        areaChart.destroy();
    }

    if (this.checked) {
        document.body.classList.add('dark');
        labelColor = labelColorLight;
        localStorage.setItem('labelColor', labelColorLight);
        renderChart(labelColor, "#f5f7ff");
    } else {
        document.body.classList.remove('dark');
        labelColor = labelColorDark;
        localStorage.setItem('labelColor', labelColorDark);
        renderChart(labelColor, labelColorDark);
    }
});

function renderChart(labelColor, titleColor) {
    let areaChartOptions = {
        series: [{
            name: "Approved Meat",
            data: [150659, 864732, 94320, 112321, 141212, 103854, 10483],
        }, {
            name: "Condemned Meat",
            data: [30232, 20123, 32143, 43532, 32154, 29321, 3203],
        }],
        chart: {
            type: "area",
            background: "transparent",
            height: 400,
            stacked: false,
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: -30,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                },
                export: {
                    csv: {
                        filename: 'Approved Vs. Condemned Analytics',
                        columnDelimiter: ',',
                        headerCategory: 'Date',
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: 'Approved Vs. Condemned Analytics',
                    },
                    png: {
                        filename: 'Approved Vs. Condemned Analytics',
                    }
                },
                autoSelected: 'zoom' 
            },
        },
        colors: ["#00ab57", "#d50000"],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            labels: {
                style: {
                    colors: labelColor,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            gradient: {
                opacityFrom: 0.4,
                opacityTo: 0.1,
                shadeIntensity: 1,
                stops: [0, 100],
                type: "vertical",
            },
            type: "gradient",
        },
        grid: {
            borderColor: "#55596e",
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        legend: {
            labels: {
                colors: labelColor,
            },
            show: true,
            position: "bottom",
        },
        markers: {
            size: 6,
            strokeColors: "#1b2635",
            strokeWidth: 3,
        },
        stroke: {
            curve: "smooth",
        },
        yaxis: [
            {
                title: {
                    text: "Approved Meat",
                    style: {
                        color: titleColor,
                    },
                },
                labels: {
                    style: {
                        colors: [labelColor],
                    },
                },
            },
            {
                opposite: true,
                title: {
                    text: "Condemned Meat",
                    style: {
                        color: titleColor,
                    },
                },
                labels: {
                    style: {
                        colors: [labelColor],
                    },
                },
            },
        ],
        tooltip: {
            shared: true,
            intersect: false,
            theme: "dark",
        }
    };

    areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
    areaChart.render();
}


  
// Receiving BAR CHART with darkmode
let ReceivingbarChart;

let computedStyle = getComputedStyle(document.documentElement);
let labelColorDark = computedStyle.getPropertyValue('--dark').trim();
let labelColorLight = computedStyle.getPropertyValue('--light').trim();

let receivingTimestamp = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'];
let dataHeads = [13, 15, 11, 12, 16, 13, 9];
let dataWeight = [8, 7, 13, 9, 11, 17, 6];
let usedTimestamp = receivingTimestamp.slice(0, dataHeads.length);

if (currentMode === 'dark') {
    document.body.classList.add('dark');
    switchMode.checked = true;
    renderReceivingbarChart(labelColorLight, 'dark');
} else {
    document.body.classList.remove('dark');
    switchMode.checked = false;
    renderReceivingbarChart(labelColorDark, 'light');
}

switchMode.addEventListener('change', function () {
    if (ReceivingbarChart) {
        ReceivingbarChart.destroy();
    }

    if(this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('mode', 'dark'); // Save mode to localStorage
        renderReceivingbarChart(labelColorLight, 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('mode', 'light'); // Save mode to localStorage
        renderReceivingbarChart(labelColorDark, 'light');
    }
});

function renderReceivingbarChart(labelColor, tooltipTheme) {
    let barChartOptions = {
        series: [
            {
                name: '# of Heads',
                data: dataHeads
            },
            {
                name: 'Weight in Kg.',
                data: dataWeight
            },
        ],
        chart: {
            type: 'bar',
            height: 500,
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: -30,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                },
                export: {
                    csv: {
                        filename: 'Receiving Analytics',
                        columnDelimiter: ',',
                        headerCategory: 'Date',
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: 'Receiving Analytics',
                    },
                    png: {
                        filename: 'Receiving Analytics',
                    }
                },
                autoSelected: 'zoom' 
            },
        },
        colors: [
            '#2962ff',
            '#d50000',
            '#2e7d32',
        ],
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: usedTimestamp,
            title: {
                text: 'Receiving Quantity',
                style: {
                    color: labelColor,
                },
            },
            labels: {
                style: {
                    colors: labelColor,
                },
            },
        },
        yaxis: {
            title: {
                text: 'Time',  
                style: {
                    color: labelColor,
                },
            },
            labels: {
                style: {
                    colors: labelColor,
                },
            },
        },
        fill: {
            opacity: 1
        },
        grid: {
            borderColor: "#55596e",
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        legend: {
            labels: {
                colors: labelColor,
            },
            show: true,
            position: "bottom",
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return  val
                }
            },
            theme: tooltipTheme,
        }
    };

    ReceivingbarChart = new ApexCharts(document.querySelector("#receiving-bar-chart"), barChartOptions);
    ReceivingbarChart.render();
}





// Antemortem BAR CHART with darkmode
var tooltipFormat = 'Heads';

function updateTooltip(format) {
  tooltipFormat = format;
}

let barChart;
if (currentMode === 'dark') {
    document.body.classList.add('dark');
    switchMode.checked = true;
    renderBarChart(labelColorLight, 'dark');
} else {
    document.body.classList.remove('dark');
    switchMode.checked = false;
    renderBarChart(labelColorDark, 'light');
}

switchMode.addEventListener('change', function () {
    if (barChart) {
        barChart.destroy();
    }

    if(this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('mode', 'dark'); // Save mode to localStorage
        renderBarChart(labelColorLight, 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('mode', 'light'); // Save mode to localStorage
        renderBarChart(labelColorDark, 'light');
    }
});
function renderBarChart(labelColor, tooltipTheme) {
    let barChartOptions = {
        series: [
            {
                name: 'Suspect/Hold',
                data: [13, 15, 11, 12, 16, 13, 9]
            }, 
            {
                name: 'Condemned',
                data: [8, 7, 13, 9, 11, 17, 6]
            }, 
            {
                
                name: 'Passed for Slaughter',
                data: [76, 85, 101, 98, 87, 105, 91]
            }
        ],
        chart: {
            type: 'bar',
            height: 450,
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: -30,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  reset: true | '<img src="/static/icons/reset.png" width="20">',
                  customIcons: []
                },
                export: {
                  csv: {
                    filename: 'Antemortem Analytics',
                    columnDelimiter: ',',
                    headerCategory: 'Date',
                    headerValue: 'value',
                    dateFormatter(timestamp) {
                      return new Date(timestamp).toDateString()
                    }
                  },
                  svg: {
                    filename: 'Antemortem Analytics',
                  },
                  png: {
                    filename: 'Antemortem Analytics',
                  }
                },
                autoSelected: 'zoom' 
              },
        },
        colors: [
            '#2962ff',
            '#d50000',
            '#2e7d32',
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
            labels: {
                style: {
                    colors: labelColor,
                },
            },
        },
        yaxis: {
            title: {
                text: 'Quantity',
                style: {
                    color: labelColor,
                },
            },
            labels: {
                style: {
                    colors: labelColor,
                },
            },
        },
        fill: {
            opacity: 1
        },
        grid: {
            borderColor: "#55596e",
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        legend: {
            labels: {
                colors: labelColor,
            },
            show: true,
            position: "bottom",
        },
        tooltip: {
            y: {
              formatter: function (val) {
                return val + ' ' + tooltipFormat;
              }
            },
            theme: tooltipTheme,
          },
    };

    barChart = new ApexCharts(document.querySelector("#antemortem-bar-chart"), barChartOptions);
    barChart.render();
}



//Postmortem Chart


var options = {
    series: [44, 55, 13, 43, 22, 13, 43, 22],
    chart: {
        width: '500',
        type: 'pie',
        toolbar: {
            show: true,
            offsetX: 0,
            offsetY: -30,
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true | '<img src="/static/icons/reset.png" width="20">',
                customIcons: []
            },
            export: {
                csv: {
                    filename: 'Postmortem Analytics',
                    columnDelimiter: ',',
                    headerCategory: 'Date',
                    headerValue: 'value',
                    dateFormatter(timestamp) {
                        return new Date(timestamp).toDateString()
                    }
                },
                svg: {
                    filename: 'Postmortem Analytics',
                },
                png: {
                    filename: 'Postmortem Analytics',
                }
            },
            autoSelected: 'zoom' 
        },
    },
    labels: ['Carcass', 'Lungs', 'Liver', 'Heart', 'Intestines','Trimmings', 'Feet', 'Kidneys','Spleen'],
    colors: ['#D21F3C', '#d45087', '#f95d6a', '#ff7c43', '#ffa600', '#003f5c', '#2f4b7c', '#665191','#a05195'],
    
    legend: {
        position: 'right',
        labels: {
            colors: ['dark'] // Change this to the color you want
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 350
            },
            legend: {
                position: 'bottom',
                show: true // This line hides the legend
            },
            borderWidth: 4,
            borderRadius: 2,
            hoverBorderWidth: 0,    
            plugins: {
            legend: {
                display: false,
            },
            },
        }
    }],
    tooltip: {
        y: {
            formatter: function(value) {
                return `${value} Kilograms`;
            }
        }
    },
 
};

var chart = new ApexCharts(document.querySelector("#postmortem-chart"), options);
chart.render();






// Fit For Human Consumption
var fitchartoptions = {
    series: [{
    name: 'Cattle',
    data: [44, 55, 41, 37, 22, 43, 21]
  }, {
    name: 'Carabao',
    data: [53, 32, 33, 52, 13, 43, 32]
  }, {
    name: 'Swine',
    data: [12, 17, 11, 9, 15, 11, 20]
  }, {
    name: 'Goat',
    data: [9, 7, 5, 8, 6, 9, 4]
  }, {
    name: 'Chicken',
    data: [25, 12, 19, 32, 25, 24, 10]
    }, {
    name: 'Duck',
    data: [12, 17, 11, 9, 15, 11, 20]
  }, {
    name: 'Horse',
    data: [9, 7, 5, 8, 6, 9, 4]
  }, {
    name: 'Sheep',
    data: [25, 12, 19, 32, 25, 24, 10]
  }, {
    name: 'Ostrich',
    data: [12, 17, 11, 9, 15, 11, 20]
  }, {
    name: 'Crocodile',
    data: [9, 7, 5, 8, 6, 9, 4]
  }],



    chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    stackType: '100%',
    toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -30,
        tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: []
        },
        export: {
            csv: {
                filename: 'Receiving Analytics',
                columnDelimiter: ',',
                headerCategory: 'Date',
                headerValue: 'value',
                dateFormatter(timestamp) {
                    return new Date(timestamp).toDateString()
                }
            },
            svg: {
                filename: 'Receiving Analytics',
            },
            png: {
                filename: 'Receiving Analytics',
            }
        },
        autoSelected: 'zoom' 
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  
  xaxis: {
    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + "Kilograms"
      },
    },
  },
  fill: {
    opacity: 1
  
  },
  legend: {
    color: 'dark',
    position: 'top',
    horizontalAlign: 'center',
    offsetX: 40,
    itemMargin: {
        horizontal: 7,
      },
     labels: {
            colors: ['dark'] // Change this to the color you want
        }
  }
  };

  var fitchart = new ApexCharts(document.querySelector("#fit-chart"), fitchartoptions);
  fitchart.render();
