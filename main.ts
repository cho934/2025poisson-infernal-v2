function Runrun () {
    if (color == 1 || color == 0) {
        if (color == 1) {
            detection = 0
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
            basic.pause(6000)
            detection = 0
            maqueen.motorStop(maqueen.Motors.All)
        }
    }
    if (color == 2) {
        detection = 0
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
        basic.pause(6000)
        detection = 0
        maqueen.motorStop(maqueen.Motors.All)
    }
}
function Endflower2 () {
    bougiewoogie = 1
}
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Skull)
    color = 1
    radio.sendNumber(1)
    radio.sendString("YELLOW")
})
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
let tirette = 0
Maqueen_V5.I2CInit()
VL53L1X.init()
bougiewoogie = 0
let duration = 85000
serial.redirectToUSB()
pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Resistive)
detection = 0
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
radio.setGroup(169)
basic.clearScreen()
basic.showIcon(IconNames.Heart)
maqueen.motorStop(maqueen.Motors.All)
maqueen.servoRun(maqueen.Servos.S2, 90)
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
    while (false) {
        if (detection == 1) {
            distance = maqueen.Ultrasonic()
            serial.writeValue("dist", distance)
            if (distance < 15) {
                serial.writeValue("x", 1)
                maqueen.motorStop(maqueen.Motors.All)
            } else {
            	
            }
        }
        if (bougiewoogie == 1) {
            maqueen.servoRun(maqueen.Servos.S2, 100)
            basic.pause(200)
            maqueen.servoRun(maqueen.Servos.S2, 80)
            basic.pause(200)
        }
        basic.pause(200)
    }
})
