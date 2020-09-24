import {Alert} from 'react-native';
import {
  getMedication4DateRange,
  postPlan,
  prepareData,
  deleteMedPlan,
} from '../netcalls/requestsMedPlan';

const fromDate = '2000-09-01';
const toDate = '2400-12-01';

//add medication to exisiting med plan
const addMed2Plan = async (toAdd) => {
  try {
    let plan = await getMedication4DateRange(fromDate, toDate);
    let obj = addMedicine(toAdd, prepareDataFromAPI(plan));
    console.log('sending add req to existing med plan ------');
    await postPlan(prepareData(obj));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//remove all instance of medication from existing med plan
const removeMedAllFromExisting = async (toRemove) => {
  try {
    console.log('sending remove ALL req to existing med plan ------');
    let response = await deleteMedPlan(toRemove._id);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// remove a date from medication in plan
const removeMed4DateFromExisting = async (dateString, toRemove) => {
  try {
    let plan = await getMedication4DateRange(fromDate, toDate);
    //if medication has only one date in datelist - remove instead of update*
    let obj = removeMed4Date(dateString, toRemove, prepareDataFromAPI(plan));
    if (checkMedDelete(toRemove.drugName, prepareData(obj))) {
      console.log(
        'sending delete for one date req to existing med plan ------',
      );
      await removeMedAllFromExisting(toRemove);
      return true;
    } else {
      console.log(
        'sending update for one date req to existing med plan ------',
      );
      await postPlan(prepareData(obj));
      return true;
    }
  } catch (error) {
    return false;
  }
};

//check whether the length of datelist === 0 when sending to db -> if it is, call delete api
const checkMedDelete = (medication, list) => {
  console.log('medication ' + medication);
  for (var x of list) {
    console.log(x);
    if (x.medication == medication) {
      return false;
    }
  }
  return true;
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
          'Medication Already Exist For Date(s) Selected',
          'Please remove it before adding again.',
          [{text: 'Got It'}],
        );
        return;
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
      //console.log('medicine exist in ' + x);
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
    obj['perDay'] = obj['per_day'];
    obj['unit'] = obj['dosage_unit']; //assign new key
    delete obj['medication']; //delete old key
    delete obj['per_day'];
    delete obj['dosage_unit'];
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
  fromDate,
  toDate,
  removeMedAllFromExisting,
  removeMed4DateFromExisting,
};
