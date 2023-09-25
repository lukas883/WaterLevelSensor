basic.forever(function () {
    WaterLevelSensor.showOnDisplay(WaterLevelSensor.getPercentage())
    WaterLevelSensor.LowLevelAlert(20, WaterLevelSensor.getPercentage())
    WaterLevelSensor.controlPump(20, 50, WaterLevelSensor.getPercentage())
})
