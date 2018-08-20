export class ReservationModel {
    id; //예약번호
    roomId: string; //회의실 ID
    roomName: string; //회의실명
    conferenceTitle: string; //회의제목
    conferenceContents: string; //예약 내용
    conferenceDate: string; //예약일
    startTime: string; //회의시작시간
    endTime: string; //회의종료시간
    attendants: any; //참석자목록

    constructor(){
    }

    public getRoomId(): string {
        return this.roomId;
    }
    public setRoomId(roomId: string) {
        this.roomId = roomId;
    }

    public getRoomName(): string {
        return this.roomName;
    }
    public setRoomName(roomName: string) {
        this.roomName = roomName;
    }

    public getConferenceTitle(): string {
        return this.conferenceTitle;
    }
    public setConferenceTitle(conferenceTitle: string) {
        this.conferenceTitle = conferenceTitle;
    }

    public getConferenceContents(): string {
        return this.conferenceContents;
    }
    public setConferenceContents(conferenceContents: string) {
        this.conferenceContents = conferenceContents;
    }

    public getConferenceDate(): string {
        return this.conferenceDate;
    }
    public setConferenceDate(conferenceDate: string) {
        this.conferenceDate = conferenceDate;
    }

    public getStartTime(): string {
        return this.startTime;
    }
    public setStartTime(startTime: string) {
        this.startTime = startTime;
    }

    public getEndTime(): string {
        return this.endTime;
    }
    public setEndTime(endTime: string) {
        this.endTime = endTime;
    }

}