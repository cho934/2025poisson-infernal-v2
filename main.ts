function Runrun () {
    if (color == 1 || color == 0) {
        if (color == 1) {
            detection = 1
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
            basic.pause(7000)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 120)
            basic.pause(1000)
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
            basic.pause(2000)
            detection = 0
            maqueen.motorStop(maqueen.Motors.All)
        }
    }
    if (color == 2) {
        detection = 1
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
        basic.pause(7000)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 120)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        basic.pause(1000)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
        basic.pause(2000)
        detection = 0
        maqueen.motorStop(maqueen.Motors.All)
    }
}
function Endflower2 () {
    bougiewoogie = 1
}
function doVL53L1X () {
    distance = VL53L1X.readSingle()
    serial.writeValue("dist", distance)
    if (distance < 70) {
        serial.writeValue("x", 1)
        maqueen.motorStop(maqueen.Motors.All)
    } else {
    	
    }
}
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Skull)
    color = 1
    radio.sendNumber(1)
    radio.sendString("YELLOW")
})
function doUltraSonic () {
    distance = maqueen.Ultrasonic()
    serial.writeValue("dist", distance)
    if (distance < 15) {
        serial.writeValue("x", 1)
        maqueen.motorStop(maqueen.Motors.All)
    } else {
    	
    }
}
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Diamond)
    color = 2
    radio.sendNumber(2)
    radio.sendString("BLUE")
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    basic.pause(1000)
    detection = 1
    Runrun()
    Endflower2()
    maqueen.motorStop(maqueen.Motors.All)
    detection = 0
})
input.onLogoEvent(TouchButtonEvent.Released, function () {
    basic.pause(2000)
    maqueen.servoRun(maqueen.Servos.S1, 90)
    maqueen.servoRun(maqueen.Servos.S2, 90)
    servos.P0.setAngle(90)
})
let distance = 0
let color = 0
let detection = 0
let bougiewoogie = 0
let duration = 85000
serial.redirectToUSB()
Maqueen_V5.I2CInit()
VL53L1X.init()
VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
VL53L1X.setMeasurementTimingBudget(50000)
bougiewoogie = 0
pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Resistive)
detection = 0
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
radio.setGroup(169)
basic.clearScreen()
basic.showIcon(IconNames.Heart)
maqueen.motorStop(maqueen.Motors.All)
maqueen.servoRun(maqueen.Servos.S2, 90)
let tirette = 0
basic.forever(function () {
    while (color == 0) {
        basic.pause(100)
    }
    // DFRobotMaqueenPlus.clearDistance(Motors.ALL)
    while (input.pinIsPressed(TouchPin.P0)) {
        if (color == 2) {
            basic.showIcon(IconNames.Diamond)
        } else {
            basic.showIcon(IconNames.Skull)
        }
        basic.pause(200)
    }
    radio.sendNumber(44)
    basic.clearScreen()
    basic.showIcon(IconNames.Angry)
    basic.pause(duration)
    detection = 1
    Runrun()
    Endflower2()
    basic.pause(500)
    while (true) {
        basic.showString("F")
    }
})
control.inBackground(function () {
    while (true) {
        if (detection == 1) {
            doVL53L1X()
        }
        if (bougiewoogie == 1) {
            maqueen.servoRun(maqueen.Servos.S2, 110)
            basic.pause(200)
            maqueen.servoRun(maqueen.Servos.S2, 60)
            basic.pause(200)
        }
        basic.pause(200)
    }
})
