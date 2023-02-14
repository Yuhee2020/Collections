import dayjs from "dayjs";
import {DATE_FORMAT} from "../constants";

export const dateFormatter=(date:Date | undefined)=>{
    return dayjs(date).format(DATE_FORMAT)
}