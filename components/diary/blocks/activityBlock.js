import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import ProgressContent from './progressContent';

//third party library
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import diaryStyles from '../../../styles/diaryStyles';
import {renderLogIcon} from '../../../commonFunctions/logFunctions';
import {
  maxSteps,
  maxDuration,
  maxCalBurnt,
} from '../../../commonFunctions/diaryFunctions';

const images = {
  run: require('../../../resources/images/activity/type_RUN.png'),
  walk: require('../../../resources/images/activity/type_WALK.png'),
  outdoor_bike: require('../../../resources/images/activity/type_OUTDOORBIKE.png'),
  elliptical: require('../../../resources/images/activity/type_ELLIPTICAL.png'),
  sports: require('../../../resources/images/activity/type_AEROBICWORKOUT.png'),
  caloriesBurnt: require('../../../resources/images/activity/calories.png'),
  distance: require('../../../resources/images/activity/distance.png'),
  steps_taken: require('../../../resources/images/activity/steps_taken.png'),
};

const steps_taken = 'Steps Taken';
const excerise = 'Exercise';
const caloriesBurnt = 'Calories Burnt';

const ActivityBlock = (props) => {
  const {visible, activityLogs, pass, summary, miss, day} = props;
  const {closeModal} = props;
  const distance = summary.distance + ' KM';
  const [expand, setExpand] = useState(true);
  const scrollViewRef = useRef();

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={closeModal} />
        </View>
        <Text style={globalStyles.pageHeader}>Activity</Text>
        <Text style={globalStyles.pageDetails}>{day}</Text>
        <View style={{flexDirection: 'row', marginTop: '3%'}}>
          {miss ? (
            <Text style={globalStyles.pageDetails}>Missed</Text>
          ) : pass ? (
            <>
              <Text style={globalStyles.pageDetails}>
                {summary.duration} Mins Active
              </Text>
              <Ionicon
                name="checkmark"
                style={diaryStyles.passIcon}
                size={25}
              />
            </>
          ) : (
            <>
              <Text style={globalStyles.pageDetails}>
                {summary.duration} Mins Active
              </Text>
              <Ionicon
                name="alert-circle-outline"
                style={diaryStyles.failIcon}
                size={25}
              />
            </>
          )}
        </View>
        <Text style={styles.header}>Summary</Text>
        <View style={styles.border} />
        <ScrollView
          style={{flex: 1}}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {renderSummaryContent(images.caloriesBurnt, caloriesBurnt, summary)}
          {renderSummaryContent(images.distance, distance, 'Distance')}
          {renderSummaryContent(images.walk, steps_taken, summary)}
          {renderSummaryContent(
            images.run,
            excerise,
            summary,
            expand,
            setExpand,
          )}
          {!expand &&
            activityLogs.map((item, index) => (
              <View style={styles.activityBlock} key={item}>
                {renderIcon(item)}
                <View>
                  <Text style={styles.content}>{item.duration} Mins</Text>
                  <Text style={styles.contentDetail}>{item.name}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

function renderSummaryContent(icon, content, detail, expand, setExpand) {
  return (
    <>
      <View style={{margin: '3%', flexDirection: 'row'}}>
        <Image source={icon} style={styles.iconImg2} />
        <View style={{marginStart: '2%'}}>
          {content === steps_taken ? (
            <ProgressContent
              value={detail.steps}
              target={maxSteps}
              flip={true}
              details={steps_taken}
              small={false}
            />
          ) : content === excerise ? (
            <ProgressContent
              value={detail.duration}
              target={maxDuration}
              flip={true}
              details={excerise}
              targetUnit={'Mins'}
              clickable={expand}
              chevronDownMethod={setExpand}
              small={false}
            />
          ) : content === caloriesBurnt ? (
            <ProgressContent
              value={detail.calories}
              target={maxCalBurnt}
              flip={true}
              details={caloriesBurnt}
              small={false}
            />
          ) : (
            <>
              <Text style={styles.content}>{content}</Text>
              <Text style={styles.contentDetail}>{detail}</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.detailBorder} />
    </>
  );
}

function renderIcon(activity) {
  let activityName = String(activity.name).toUpperCase().replace(/\s/g, '');
  return (
    <View style={{marginBottom: '20%'}}>
      {activityName === 'RUN' ? (
        <Image source={images.run} style={styles.iconImg2} />
      ) : activityName === 'WALK' ? (
        <Image source={images.walk} style={styles.iconImg2} />
      ) : activityName === 'OUTDOORBIKE' ? (
        <Image source={images.outdoor_bike} style={styles.iconImg2} />
      ) : activityName === 'ELLIPTICAL' ? (
        <Image source={images.elliptical} style={styles.iconImg2} />
      ) : activityName === 'SPORTS' ? (
        <Image source={images.sports} style={styles.iconImg2} />
      ) : (
        <Icon name="swim" style={styles.iconImg2} size={60} color="#3ec1c1" />
      )}
    </View>
  );
}

export default ActivityBlock;

const styles = StyleSheet.create({
  header: {
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.lastLogValueColor,
    fontSize: 20,
    marginTop: '7%',
    marginStart: '5%',
  },
  content: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 18,
    marginTop: '7%',
    marginStart: '5%',
  },
  contentDetail: {
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.lastLogValueColor,
    fontSize: 17,
    marginTop: '7%',
    marginStart: '5%',
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.lastLogValueColor,
    margin: '3%',
  },
  detailBorder: {
    borderWidth: 0.5,
    borderColor: Colors.lastLogValueColor,
    margin: '3%',
  },
  iconImg2: {
    height: 50,
    width: 50,
  },
  iconImg: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    width: 30,
    height: 30,
    resizeMode: 'contain', //resize image so dont cut off
  },
  activityBlock: {
    flexDirection: 'row',
    marginStart: '2%',
  },
});

//comment
