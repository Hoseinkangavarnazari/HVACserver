

function timeConverter () { 
    return DateTime.local().toISO().substring(0, DateTime.local().toISO().lastIndexOf("") - 6);
}

// better to create class here to convert or change receiveing format

 exports = timeConverter;