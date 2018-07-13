export default class ReloadService {

    constructor(functionToRun, timeBetweenCalls, startTime) {
        this.startTime = startTime;
        this.functionToRun = functionToRun;
        this.timeBetweenCalls = timeBetweenCalls;
    }

    repeat(){
        let now = new Date().getTime();
        console.log('reload: ' + (now - this.startTime));
        setTimeout(this.functionToRun(), this.timeBetweenCalls - ((now - this.startTime) % this.timeBetweenCalls));
    }
}