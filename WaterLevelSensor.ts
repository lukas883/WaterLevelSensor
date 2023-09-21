

//% color="#AA278D" weight=100
namespace WaterLevelSensor {
    //% block
    export function getPercentage() {
        let count = 0
        let sections = (4194304>>0)
        for (let index = 0; index < 8; index++) {
            if (pins.i2cReadNumber(119, NumberFormat.UInt8LE, false) > 240) {
                count++
            }
        }
        for (let index = 0; index < 12; index++) {
            if (pins.i2cReadNumber(120, NumberFormat.UInt8LE, false) > 240) {
                count++
            }
        }
        
        let num=sections
        let bin=""
        while(num>0){
            if (num%2==0){
                bin=bin+"0"
                num=num/2
            }
            else{
                bin=bin+"1"
                num=(num-1)/2
            }
        }
        
        
        serial.writeNumber(count)
        serial.writeLine("  ")
        //while(sections&1){
            //count++
            //sections=sections>>1
        //}
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
    //%block
    export function LowLevelAlert(threshold:number, level:number){
        if(level<threshold){
            music.ringTone(Note.C)
        }
        else{
            music.stopAllSounds()
        }
    }
}// Gib deinen Code hier ein
