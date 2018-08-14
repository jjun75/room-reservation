export class Reservation {
    id; //예약번호
    roomId: string; //회의실 ID
    roomName: string; //회의실명
    conferenceTitle: string; //회의제목
    conferenceContents: string; //예약 내용
    conferenceDate: Date; //예약일
    startTime: string; //회의시작시간
    endTime: string; //회의종료시간
    attendants: any; //참석자목록

    constructor(){
    }

    getRoomId(): string {
        return this.roomId;
    }
    setRoomId(roomId: string) {
        this.roomId = roomId;
    }

    getRoomName(): string {
        return this.roomName;
    }
    setRoomName(roomName: string) {
        this.roomName = roomName;
    }

    getConferenceTitle(): string {
        return this.conferenceTitle;
    }
    setConferenceTitle(conferenceTitle: string) {
        this.conferenceTitle = conferenceTitle;
    }

    getConferenceContents(): string {
        return this.conferenceContents;
    }
    setConferenceContents(conferenceContents: string) {
        this.conferenceContents = conferenceContents;
    }

    getConferenceDate(): Date {
        return this.conferenceDate;
    }
    setConferenceDate(conferenceDate: Date) {
        this.conferenceDate = conferenceDate;
    }

    getStartTime(): string {
        return this.startTime;
    }
    setStartTime(startTime: string) {
        this.startTime = startTime;
    }

    getEndTime(): string {
        return this.endTime;
    }
    setEndTime(endTime: string) {
        this.endTime = endTime;
    }

}