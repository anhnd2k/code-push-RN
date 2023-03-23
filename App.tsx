/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, type PropsWithChildren} from 'react';
import codePush from 'react-native-code-push';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setupCodePush();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupCodePush = () => {
    codePush
      .sync(
        {
          // deploymentKey: 'zf2EJjLwjLIaT0gwBr_O0j2meXplDU5AVALdD',
          deploymentKey: 'OND5IUzGlR3gId0xkDmxSBI5NiRLXUqxKe-Ho',
          // installMode: codePush.InstallMode.IMMEDIATE,
          updateDialog: {
            title: 'Thông báo',
            optionalInstallButtonLabel: 'Cài đặt',
            optionalIgnoreButtonLabel: 'Bỏ qua',
            optionalUpdateMessage:
              'Có bản cập nhật mới từ nhà phát triển. Bạn muốn cài đặt nó?',
          },
        },
        codePushStatusDidChange,
        codePushDownloadDidProgress,
      )
      .then((res: any) => {
        codePush.getUpdateMetadata().then(current => {
          if (current) {
            console.log(
              'appVersion --------',
              current?.appVersion,
              current?.label,
            );
            // const v = `${current?.appVersion} ${current?.label}`;
            // _store.dispatch(saveVersion(v));
          } else {
            // console.log('getVersion() ---------', getVersion());
            // _store.dispatch(saveVersion(getVersion()));
          }
        });
      });
  };

  const codePushStatusDidChange = (status: any) => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        // console.log('codePush::Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // console.log('codePush::Downloading package.');
        // setMessageProgressUpdate('Đang tải');
        console.log('==>>> Đang tải');

        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        // console.log('codePush::Installing update.');
        // setMessageProgressUpdate('Đang cài đặt vui lòng không tắt máy...');
        console.log('==>>> Đang cài đặt vui lòng không tắt máy...');

        break;
      case codePush.SyncStatus.UP_TO_DATE: {
        // setMessageProgressUpdate('');
        console.log('==>>> up to date');

        // console.log('codePush::Up-to-date.');
        break;
      }
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // console.log('codePush::Update installed.');
        // setMessageProgressUpdate('Đang khởi động lại ứng dụng...');
        console.log('==>>> Đang khởi động lại ứng dụng...');

        setTimeout(() => {
          codePush.restartApp();
        }, 500);
        break;
    }
  };

  const codePushDownloadDidProgress = (progress: any) => {
    // console.log(
    //   'codePush::',
    //   progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
    // );
    console.log(
      `Đang tải : ${
        progress &&
        progress.receivedBytes &&
        progress.totalBytes &&
        progress.totalBytes != 0
          ? Math.floor((progress.receivedBytes * 100) / progress.totalBytes)
          : 0
      }%`,
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> ngo hoang anh
          </Section>
          {/* <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section> */}
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default codePush(codePushOptions)(App);
