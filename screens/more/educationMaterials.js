import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator, FlatList} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import InProgress from '../../components/inProgress';
import {ResourcesTab} from "../../components/education/ResourcesTab";
import {getArticles, getHypoCorrectionFoodArticles} from "../../netcalls/education/educationEndpoints";
import {EducationMediaRow} from "../../components/education/EducationMediaRow";
import HypocorrectionFood from "./hypocorrectionFood";
import {HypoCorrectionFoodRow} from "../../components/education/HypoCorrectionFoodRow";

const EducationMaterialsScreen = (props) => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [educationalContent, setEducationalContent] = React.useState([]);
  const [hypocorrectionFoodContent, setHypocorrectionFoodContent] = React.useState([]);

  React.useEffect(() => {
      if (isLoading) {
          // Load data
          getArticles().then(articles => {
             setEducationalContent(articles);
          });
          getHypoCorrectionFoodArticles().then(articles => {
             setHypocorrectionFoodContent(articles);
          });
          setIsLoading(false);
      }
  });

  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Resources</Text>
        {
            //<InProgress/>
        }
        <View style={[globalStyles.pageDetails, {flex: 1}]}>
            <ResourcesTab currentTab={currentTabIndex} setTabCallback={setCurrentTabIndex} />
            {
                isLoading ?
                (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size='large' color='#aad326' />
                </View>) :
                    (
                        <FlatList data={currentTabIndex === 0 ? educationalContent : hypocorrectionFoodContent}
                                  keyExtractor={(content, index) => `${content.title}-${index}`}
                                  style={{flexGrow: 1}}
                                  contentContainerStyle={{flexGrow: 1, paddingTop: '4%'}} renderItem={({item}) =>
                                        currentTabIndex === 0 ?
                                        (<EducationMediaRow title={item.title}
                                                            organization={item.organization}
                                                            mediaDisplayUri={item.mediaDisplayUri}
                                                            uriType={item.uriType}
                                                            uri={item.uri}
                                        />) :
                                            (<HypoCorrectionFoodRow item={item} />)
                                  }
                        />
                    )
            }
        </View>
    </View>
  );
};

export default EducationMaterialsScreen;
