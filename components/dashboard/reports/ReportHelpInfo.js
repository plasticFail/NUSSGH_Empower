import React from 'react';
import EvilIcon from "react-native-vector-icons/EvilIcons";
import {Colors} from "../../../styles/colors";
import {TouchableOpacity, View, Text, StyleSheet, Dimensions} from "react-native";
import Modal from 'react-native-modal';
import globalStyles from "../../../styles/globalStyles";
import {adjustSize} from '../../../commonFunctions/autoResizeFuncs';


const lineChartToolTipMessage = "Swipe on the graph to look at various timestamps!";
const barChartToolTipMessage = "Tap on the bars for more details!";


function ReportHelpInfo(props) {
    const {showInfo, toggleInfoCallback} = props;
    return (<TouchableOpacity onPress={toggleInfoCallback}>
        <EvilIcon
            name="question"
            color={Colors.lastLogButtonColor}
            size={adjustSize(40)}
            style={{paddingRight: adjustSize(15)}}
        />
        { showInfo &&
        <View style={[styles.tooltip, {transform: [{translateX: -adjustSize(170)}, {translateY: adjustSize(20)}]}]}>
            <Text>{props.message}</Text>
        </View>
        }
    </TouchableOpacity>)
}

function ReportHelpModal(props) {
    const {showInfo, toggleInfoCallback, image, type} = props;

    return (
        (<TouchableOpacity onPress={toggleInfoCallback}>
            <EvilIcon
                name="question"
                color={Colors.lastLogButtonColor}
                size={adjustSize(40)}
                style={{paddingRight: adjustSize(15)}}
            />
            <Modal isVisible={showInfo}
                   style={{marginTop: '20%', marginBottom: '20%', borderRadius: adjustSize(10), overflow: 'hidden', backgroundColor: '#fff'}}
                   onBackButtonPress={toggleInfoCallback}
                   onBackdropPress={toggleInfoCallback}>
                <View style={[globalStyles.pageContainer, {backgroundColor: type === 'bar' ? '#ffffff' : '#fbfbfb'}]}>
                    <View style={globalStyles.menuBarContainer} />
                    {image}
                    {   type === 'line' &&
                        (<View style={{width: '100%', alignItems: 'center'}}>
                            <Text style={globalStyles.pageDetails}>Interact with the Graph!</Text>
                            <Text style={globalStyles.pageSubDetails}>Drag the <View style={styles.cursor}/> left and right</Text>
                            <Text style={globalStyles.pageSubDetails}>to view the data</Text>
                        </View>)
                    }
                    {
                        type === 'bar' &&
                        (<View style={{width: '100%', alignItems: 'center', paddingTop: '2%'}}>
                            <Text style={globalStyles.pageDetails}>Tap on the bars <View style={styles.bars} /></Text>
                            <Text style={globalStyles.pageSubDetails}>to view the data</Text>
                        </View>)
                    }
                    <View style={{flex: 1}} />
                    <TouchableOpacity onPress={toggleInfoCallback}>
                        <View style={[globalStyles.nextButtonStyle, {alignItems: 'center'}]}>
                            <Text style={globalStyles.actionButtonText}>Got It</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </TouchableOpacity>)
    )
}

const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        width: adjustSize(180),
        padding: adjustSize(10),
        borderRadius: adjustSize(10),
        backgroundColor: 'white',
        borderColor: '#8d8d8d',
        borderWidth: 1
    },
    cursor: {
        backgroundColor: Colors.nextBtnColor,
        width: adjustSize(20),
        height: adjustSize(20),
        borderRadius: adjustSize(10)
    },
    bars: {
        backgroundColor: Colors.nextBtnColor,
        width: adjustSize(8),
        height: adjustSize(20),
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    }
})

export {ReportHelpInfo, ReportHelpModal, barChartToolTipMessage, lineChartToolTipMessage};
