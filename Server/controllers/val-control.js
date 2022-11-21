exports.GetValues = (report) => {
  let blood = {
    RBC : [4.7, 6],
    HGB : [13.5, 18],
    HCT : [37, 47],
    MCV : [78, 99],
    MCH : [27, 31],
    MCHC : [32, 36],
    RDW : [11.5, 14.5],
    WBC : [4, 10.5],
    LYMP : [20, 45],
    LYM : [1.2, 3.2],
    MONP : [1, 8],
    MON : [0.3, 0.8],
    GRAP : [52, 76],
    GRA : [1.6, 7.2],
    PLT : [140, 440],
    MPV : [7.4, 10.4],
    PCT : [0.1,0.5],
    PDW : [9, 14]
  }
  let values = {};
  for(let key in blood){
    if(report[key] < blood[key][0]){
      values[key] = 'warning';
    }
    else if(report[key] > blood[key][1]){
      values[key] = 'danger';
    }
    else{
      values[key] = 'success';
    }
  }
  return values;
}



// let rep = {
//   RBC : 2,
//   HGB : 15,
//   HCT : 1,
//   MCV : 8,
//   MCH : 3,
//   MCHC : 1,
//   RDW : 11,
//   WBC : 4 ,
//   LYMP : 2,
//   LYM : 0.2,
//   MONP : 1,
//   MON : 0.3,
//   GRAP : 5,
//   GRA : 1.6,
//   PLT : 140,
//   MPV : 7.4,
//   PCT : 0,
//   PDW : 1
// }
// let val = GetValues(rep);
// console.log(val);

