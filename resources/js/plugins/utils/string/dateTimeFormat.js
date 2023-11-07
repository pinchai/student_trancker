/**
 *  format phone number
 *
 * '012942924' => '012-942-924'
 */
import moment from "moment";

function dateFormat(
    value,
    defaultFormat = "",
    format = "DD-MM-YYYY HH:mm:ss",
    nullValue = ""
) {
    if (value != "" && value != null && value != "0000-00-00 00:00:00") {
        if (defaultFormat != "") {
            return moment(value, defaultFormat).format(format);
        } else {
            return moment(value).format(format);
        }
    } else return nullValue;
}

export default dateFormat;
