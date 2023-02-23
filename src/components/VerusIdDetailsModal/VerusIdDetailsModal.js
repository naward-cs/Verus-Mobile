import React, {useEffect, useState} from 'react';
import {Linking, SafeAreaView, View} from 'react-native';
import Colors from '../../globals/colors';
import SemiModal from '../SemiModal';
import {Button, Text, Divider} from 'react-native-paper';
import Styles from '../../styles';
import AnimatedActivityIndicatorBox from '../AnimatedActivityIndicatorBox';
import VerusIdObjectData from '../VerusIdObjectData';
import {createAlert} from '../../actions/actions/alert/dispatchers/alert';
import MissingInfoRedirect from '../MissingInfoRedirect/MissingInfoRedirect';

export default function VerusIdDetailsModal(props) {
  const {
    loadVerusId,
    visible,
    animationType,
    cancel,
    loadFriendlyNames,
    StickyFooterComponent,
  } = props;
  const DEFAULT_FAIL_MESSAGE = 'Failed to load VerusID';

  const [verusId, setVerusId] = useState(null);
  const [friendlyNames, setFriendlyNames] = useState(null);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [failedMessage, setFailedMessage] = useState(DEFAULT_FAIL_MESSAGE);

  async function onVisibleUpdate() {
    if (visible) {
      try {
        setVerusId(await loadVerusId());
        setFriendlyNames(await loadFriendlyNames());
      } catch (e) {
        setFailedToLoad(true);

        if (e.message) {
          setFailedMessage(e.message);
        }
      }
    }
  }

  openIdDetails = () => {
    let url = `https://verus.io/verusid-lookup/${verusId.identity.name}@`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  useEffect(() => {
    onVisibleUpdate();
  }, [visible]);

  return (
    <SemiModal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={cancel}
      flexHeight={4}>
      {(friendlyNames == null || verusId == null) && !failedToLoad ? (
        <AnimatedActivityIndicatorBox />
      ) : (
        <SafeAreaView style={Styles.centerContainer}>
          <View style={{...Styles.headerContainer, minHeight: 48}}>
            <View style={Styles.semiModalHeaderContainer}>
              <Button onPress={cancel} color={Colors.primaryColor}>
                {'Close'}
              </Button>
              <Text
                style={{
                  ...Styles.centralHeader,
                  ...Styles.smallMediumFont,
                }}>
                {failedToLoad ? "Error" : `${verusId.identity.name}@`}
              </Text>
              <Button
                onPresscolor={Colors.primaryColor}
                disabled={verusId == null || failedToLoad}
                onPress={openIdDetails}>
                {'Details'}
              </Button>
            </View>
          </View>
          {failedToLoad ? (
            <View style={{flex: 1, ...Styles.fullWidth}}>
              <MissingInfoRedirect
                icon={'alert-circle-outline'}
                label={failedMessage}
              />
              {StickyFooterComponent != null ? StickyFooterComponent : null}
            </View>
          ) : (
            <VerusIdObjectData
              verusId={verusId}
              friendlyNames={friendlyNames}
              StickyFooterComponent={StickyFooterComponent}
            />
          )}
        </SafeAreaView>
      )}
    </SemiModal>
  );
}
