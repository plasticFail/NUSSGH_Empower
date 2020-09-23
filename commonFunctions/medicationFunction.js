import {Alert} from 'react-native';
import {getMedication4DateRange} from '../netcalls/requestsMedPlan';

//add medication to exisiting med plan
const addMed2Plan = async () => {
  let plan = await getMedication4DateRange('1970-01-01', '9999-01-01');

  return plan;
};

//adding to data to initialList, returning new list (no med plan existing yet)
const addMedicine = (data, initialList) => {
  let object = initialList;
  for (var x of Object.keys(data)) {
    if (!Object.keys(object).includes(x)) {
      console.log('no medicine for this date, adding medicine');
      object[x] = {
        selected: true,
        marked: true,
        medicationList: [data[x].medicine],
      };
    } else {
      //there is an existing date with medication
      //check if medication exist in medicationlist for that date, if not add
      if (!containsObject(data[x].medicine, object[x].medicationList)) {
        object[x].medicationList.push(data[x].medicine);
      } else {
        Alert.alert(
          'Medication Already Exist',
          'Please remove it before adding again.',
          [{text: 'Got It'}],
        );
      }
    }
  }
  return object;
};

//remove selecteditem for a particular date in medplan (initialList)
const removeMed4Date = (dateString, selectedItem, initialList) => {
  let original = initialList;
  for (var x of Object.keys(original)) {
    if (x === dateString) {
      console.log('removing for one date');
      let medList = original[x].medicationList;
      let removeIndex = medList
        .map(function (item) {
          return item.drugName;
        })
        .indexOf(selectedItem.drugName);
      medList.splice(removeIndex, 1);
    }
  }
  return original;
};

const removeMed4All = (selectedItem, initialList) => {
  let original = initialList;
  for (var x of Object.keys(original)) {
    let medList = original[x].medicationList;
    //check if selected medication exist for that date
    if (containsObject(selectedItem, medList)) {
      console.log('medicine exist in ' + x);
      let removeIndex = medList
        .map(function (item) {
          return item.drugName;
        })
        .indexOf(selectedItem.drugName);
      medList.splice(removeIndex, 1);
      console.log(medList);
    }
  }
  return original;
};

//prepares data received from api with diff keys
const prepareDataFromAPI = (data) => {
  let newObj = {};
  for (var x of Object.keys(data)) {
    let list = renameKey(data[x]);
    newObj[x] = {
      selected: true,
      marked: true,
      medicationList: list,
    };
  }
  return newObj;
};

const renameKey = (list) => {
  list = list.map((obj) => {
    obj['drugName'] = obj['medication'];
    obj['perDay'] = obj['per_day']; //assign new key
    delete obj['medication']; //delete old key
    delete obj['per_day'];
    return obj;
  });

  return list;
};

//check if in medicationList array medicine name exist*
const containsObject = (obj, list) => {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].drugName === obj.drugName) {
      return true;
    }
  }
  return false;
};

export {
  addMedicine,
  removeMed4Date,
  removeMed4All,
  prepareDataFromAPI,
  addMed2Plan,
};
