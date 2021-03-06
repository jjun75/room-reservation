import { User } from "./user";

export class ReservationModel {
    rid; //예약번호
    uid; //예약자 ID
    userName: any;
    roomId: String; //회의실 ID
    roomName: String; //회의실명
    conferenceTitle: String; //회의제목
    conferenceContents: String; //예약 내용
    conferenceDate: String; //예약일
    startTime: String; //회의시작시간
    endTime: String; //회의종료시간
    attendants: any; //참석자목록
    registerId: String; //등록자 ID
    icon: any; //timeline icon
    time: any; //timeline text
    messagesCnt: number = 0;
    dispOrder: number;
    displayYn: boolean = false; //회의실 예약목록에서 날짜 출력 여부 저장.
    attendant: any;

    constructor(){
    }
    public getRid(): String {
        return this.rid;
    }
    public setRid(rid: String) {
        this.rid = rid;
    }
    public getUid(): String {
        return this.uid;
    }
    public setUid(uid: String) {
        this.uid = uid;
    }
    public getRoomId(): String {
        return this.roomId;
    }
    public setRoomId(roomId: String) {
        this.roomId = roomId;
    }

    public getRoomName(): String {
        return this.roomName;
    }
    public setRoomName(roomName: String) {
        this.roomName = roomName;
    }

    public getConferenceTitle(): String {
        return this.conferenceTitle;
    }
    public setConferenceTitle(conferenceTitle: String) {
        this.conferenceTitle = conferenceTitle;
    }

    public getConferenceContents(): String {
        return this.conferenceContents;
    }
    public setConferenceContents(conferenceContents: String) {
        this.conferenceContents = conferenceContents;
    }

    public getConferenceDate(): String {
        return this.conferenceDate;
    }
    public setConferenceDate(conferenceDate: String) {
        this.conferenceDate = conferenceDate;
    }

    public getStartTime(): String {
        return this.startTime;
    }
    public setStartTime(startTime: String) {
        this.startTime = startTime;
    }

    public getEndTime(): String {
        return this.endTime;
    }
    public setEndTime(endTime: String) {
        this.endTime = endTime;
    }

    public getRegisterId(): String {
        return this.registerId;
    }

    public setRegisterId(id: String){
        this.registerId = id;
    }

    public setTime(time: any){
        this.time = time;
    }
    public getTime(){
        return this.time;
    }

    public setIcon(icon: any) {
      this.icon = icon;
    }
    public getIcon() {
      return this.icon;
    }

    public setMessagesCnt(cnt: number){
      this.messagesCnt = cnt;
    }
    public getMessagesCnt(): number{
      return this.messagesCnt;
    }

    public setDispOrder(dispOrder: number){
      this.dispOrder = dispOrder;
    }
    public getDispOrder(): number {
      return this.dispOrder;
    }

    public isDisplay(): boolean {
      return this.displayYn;
    }
    public setDisplay(displayYn) {
      this.displayYn = displayYn;
    }

    public setAttendant(attendant: any) {
        this.attendant = attendant;
    }
    public getAttendant(){
        return this.attendant;
    }

    public setUserName(userName: String){
      this.userName = userName;
    }
    public getUserName(){
      return this.userName;
    }
}
