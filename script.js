// **************** Grab DOM Elements ******************
const saveBtn = $(".saveBtn");

////// Implement Current Day
$("#currentDay").text(
  luxon.DateTime.local().toLocaleString({
    weekday: "long",
    month: "long",
    day: "2-digit",
  })
);

//Create a function that styles the timeblocks in real time
//past, present & future

function timeBlockEl() {
  let hourEl = luxon.DateTime.local().toLocaleString({
    hour: "2-digit",
    hour12: false,
  });
  let formattedHour = parseInt(hourEl[0] + hourEl[1]);
  // console.log(formattedHour);
  // console.log(hourEl);
  $(".time-block").each(function () {
    let currentHour = parseInt($(this).attr("id"));
    // console.log(currentHour);
    if (formattedHour > currentHour) {
      $(this).addClass("past");
    } else if (currentHour === formattedHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}
//When save button is clicked, store input to local storage

saveBtn.on("click", function () {
  let time = $(this).siblings(".hour").text();
  let usrTxt = $(this).siblings(".usrTxt").val();
  // console.log(usrTxt);
  // console.log(time);
  localStorage.setItem(time, usrTxt);
});

// Create a function to keep local storage on page reload

function storeEl() {
  $(".hour").each(function () {
    let currentHour = $(this).text();
    let storedTxt = localStorage.getItem(currentHour);

    if (storedTxt !== null) {
      $(this).siblings(".usrTxt").val(storedTxt);
    }
    // console.log(storedTxt);
  });
}

// *************** Call Functions ****************
timeBlockEl();
storeEl();