

//% color="#AA278D" weight=100
namespace WaterLevelSensor {
    /**
     * returns the Water Level with a number between 0 and 100
     */
    //% block
    export function getPercentage() {
        let count = 0
        let THREASHOLD = 245
        for (let index = 0; index < 8; index++) {
            serial.writeNumber(pins.i2cReadNumber(119, NumberFormat.UInt8LE, false))
            serial.writeString(".")
            if (pins.i2cReadNumber(119, NumberFormat.UInt8LE, false) > THREASHOLD) {
                count++
            }
        }
        for (let index = 0; index < 12; index++) {
            serial.writeNumber(pins.i2cReadNumber(120, NumberFormat.UInt8LE, false))
            serial.writeString(".")
            if (pins.i2cReadNumber(120, NumberFormat.UInt8LE, false) > THREASHOLD) {
                count++
            }
        }       
        
        //serial.writeNumber(count)
        serial.writeLine("  ")
        return count * 5
    }
    /**
     * show the Water Level on the LED Matrix
     * @param percentage from the WaterLevelSensor
     */
    //%block
    export function showOnDisplay(percentage:number){


        //get (0,100)-->(0,25)
        let numLED =Math.floor(percentage/4)
        //plot the LEDs
        for(let i=0;i<numLED;i++){
            led.plot(i%5,4-Math.floor(i/5))
        }
        for (let i=numLED;i<25;i++){
            led.unplot(i % 5, 4 - Math.floor(i / 5))
        }
    }
    /**
     * makes a sound if the Water Level drops below a certain threshold
     * @param threshold Water level that triggers the LowLevelAlert
     * param level is the return value of getPercentage()
     */
    //%block
    export function LowLevelAlert(threshold:number, level:number){
        if(level<threshold){
            music.ringTone(Note.C)
        }
        else{
            music.stopAllSounds()
        }
    }
    /**
     * controls a pump through pin C16 so that the water level will stay between min and max
     * @param min starts pump
     * @param max stops pump
     * @param level is the Water level from getPercentage()
     */
    //%block
    export function controlPump(min:number, max:number, level:number){
        if (level<min){
            //turn on the Pump through Pin C16 (electronic Switch)
            pins.digitalWritePin(DigitalPin.C16, 1)
        } 
        else if(level>max){
            pins.digitalWritePin(DigitalPin.C16, 0)
        }
    }
}// Gib deinen Code hier ein
