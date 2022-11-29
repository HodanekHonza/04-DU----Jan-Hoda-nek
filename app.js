//var startTime = performance.now()

const namesMen = [
  "Jiří",	"Jan","Josef",	"Pavel",	"Martin",	"Tomáš", "Jaroslav", "Miroslav",	
  "Zdeněk",	"Václav",	"Michal",	"František", "Jakub",	"Karel", "Lukáš", "David", "Vladimír", 
  "Ondřej",	"Ladislav",	"Roman", "Marek", "Stanislav", "Daniel", "Radek", "Vojtěch"
];

const namesWoman = [
"Jana",	"Marie", "Eva",	"Hana",	"Anna",	"Lenka", "Kateřina",	"Lucie",	"Věra",	
"Alena", "Petra", "Veronika", "Jaroslava", "Tereza", "Martina",	"Monika",	
"Michaela", "Jitka", "Helena",	"Ludmila", "Zdeňka", "Ivana",	"Eliška",	
"Zuzana",	"Markéta"	
];


const surNames = [
"Novák"	,	"Nováková",	"Svoboda", "Svobodová", "Novotný",	"Novotná", "Dvořák", "Dvořáková",	
"Černý", "Černá", "Procházka"	,"Procházková", "Kučera",	"Kučerová",	
"Veselý",	"Veselá",	"Horák"	,	"Horáková",	"Němec"	,	"Němcová","Marek"	,	"Marková",
"Pospíšil", "Pokorná", "Pokorný",	"Pospíšilová", "Hájek",	"Hájková", "Král", "Králová",
"Jelínek",	"Jelínková", "Růžička",	"Růžičková", "Beneš",	"Benešová", "Fiala",	"Fialová",
"Sedláček",	"Sedláčková", "Doležal", "Doležalová", "Zeman",	"Zemanová", "Kolář", "Kolářová",
"Navrátil", "Navrátilová", "Čermák",	"Čermáková"];

const workload = [10, 20, 30, 40];


//update this object to change how much staff you want, plus what age groups you want
const dToIn = {
maxStaff: 7,
year : {MinDateofBirth : 1950, 
        MaxDateofBirth : 2004}
};



//main function
function main(dToIn) {
const maxStaff = dToIn.maxStaff;
const minYear = dToIn.year.MaxDateofBirth;
const maxYear = dToIn.year.MinDateofBirth;
const sortedByWorkload = getWorkers(maxStaff, minYear, maxYear);
let dotoOut =  workerStatsObject(sortedByWorkload);

function addDataDtoIn() {
  let agesObject = []
  let medianWorkload = []
  let WorkloadWoman = []
sortedByWorkload.map((object) => {
 medianWorkload.push(object.workload)
  dotoOut.total = maxStaff
  const date = object.birthdate.substring(0, 10)
  const allAges = calculateAge(date)
  agesObject.push(allAges)
  if (object.workload === 40) {
    dotoOut.workload40 += 1
  } else if (object.workload === 30) {
      dotoOut.workload30 += 1
  } else if (object.workload === 20) {
      dotoOut.workload20 += 1
  } else if (object.workload === 10) {
      dotoOut.workload10 += 1
  }
  if (object.gender === 'female') { 
    WorkloadWoman.push(object.workload)
  }
})


//assigning the min and max age of workers + average age and averageWomenWorkload
  const AverageAgeFunc = agesObject.reduce((a, b) => a + b) / agesObject.length
  const AverageWomanWorkloadFunc = WorkloadWoman.reduce((a, b) => a + b) / WorkloadWoman.length
  const min = Math.min(...agesObject)
  const max = Math.max(...agesObject)
  const medianAge = median(agesObject)
  const medianWorkloadPush = median(medianWorkload)
  dotoOut.averageWomenWorkload = Math.floor(AverageWomanWorkloadFunc)
  dotoOut.averageAge = Math.round(AverageAgeFunc * 10) / 10
  dotoOut.minAge = min
  dotoOut.maxAge = max
  dotoOut.medianWorkload = medianWorkloadPush
  dotoOut.medianAge = medianAge
  console.log(medianWorkload)
  console.log(agesObject.sort())
  console.log(WorkloadWoman)
}
// execution of function withIn Main()
addDataDtoIn()
console.log(dotoOut);
return  dotoOut; 
}



//function for calculating age based on date of birth
const calculateAge = (birthday) => {
const ageDifMs = Date.now() - new Date(birthday).getTime();
const ageDate = new Date(ageDifMs);
return Math.abs(ageDate.getUTCFullYear() - 1970);
}



const median = arr => {
const mid = Math.floor(arr.length / 2),
  nums = [...arr].sort((a, b) => a - b);
return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

main(dToIn)




function getWorkers(staff,minimalYear,maximumYear) {
const maxStaff = staff
const minYear = minimalYear
const maxYear = maximumYear
let workers = new Array();
for (let i = 0; i < maxStaff; i++) {
  workers.push(getWorker());
  workers.sort((a, b) => {
    return a.workload - b.workload;
  });
  workers.map((object) => {
   if (object.surname.at(-1) === "á") {
    object.gender = "female";
    object.name = namesWoman[Math.floor(Math.random() * namesWoman.length)];
  } else if (object.surname.at(-1) !== "á") {
    object.gender = "male";
    object.name = namesMen[Math.floor(Math.random() * namesMen.length)];
  } 
  if (dToIn) {
    let year = Math.floor(Math.random() * (maxYear - minYear) + minYear);
    let month = Math.floor(Math.random() * 12)
    let day = Math.floor(Math.random() * 31)
    let dat = new Date(year,month,day);
    let dateISO = dat.toISOString();
    object.birthdate = dateISO
    }

  }); 
  
}
return workers;
}



//worker info object sceleton

function getWorker() {
let worker = {
  gender: undefined,
  birthdate: undefined,
  name: undefined,
  surname: surNames[Math.floor(Math.random() * surNames.length)],
  workload: workload[Math.floor(Math.random() * workload.length)],
}
return worker;

}



//workers stats object sceleton
function workerStatsObject(info) {

let stats = {
  total: undefined,
  workload10: 0,
  workload20: 0,
  workload30: 0,
  workload40: 0,
  averageAge: undefined,
  minAge: undefined,
  maxAge: undefined,
  medianAge: undefined,
  medianWorkload: undefined,
  averageWomenWorkload: undefined,
  information : info
}
return stats;
}





//avrg 10 ms execution time on 50 members of staff -> dToIn data
//var endTime = performance.now()
//console.log(`Execution time is ${endTime - startTime} milliseconds`)