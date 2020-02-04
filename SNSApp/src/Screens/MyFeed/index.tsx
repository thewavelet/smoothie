import React, {useContext, useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Styled from 'styled-components/native';

import {RandomUserDataContext} from '~/Context/RandomUserData';
import IconButton from '~/Components/IconButton';
import Feed from '~/Components/Feed';

import StoryList from './StoryList';

const HeaderRightContainer = Styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const MyFeed = ({navigation}: Props) => {
  const {getMyFeed} = useContext(RandomUserDataContext);
  const [feedList, setFeedList] = useState<Array<IFeed>>([]);
  const [storyList, setStoryList] = useState<Array<IFeed>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFeedList(getMyFeed());
    setStoryList(getMyFeed());
  }, [getMyFeed]);

  return (
    <FlatList
      data={feedList}
      keyExtractor={(item, index) => {
        return `myfeed-${index}`;
      }}
      showsVerticalScrollIndicator={false}
      onRefresh={() => {
        setLoading(true);
        setTimeout(() => {
          setFeedList(getMyFeed());
          setStoryList(getMyFeed());
          setLoading(false);
        }, 2000);
      }}
      onEndReached={() => {
        setFeedList([...feedList, ...getMyFeed()]);
      }}
      onEndReachedThreshold={0.5}
      refreshing={loading}
      ListHeaderComponent={<StoryList storyList={storyList} />}
      renderItem={({item, index}) => (
        <Feed
          id={index}
          name={item.name}
          photo={item.photo}
          description={item.description}
          images={item.images}
        />
      )}
    />
  );
};

MyFeed.navigationOptions = {
  title: 'SNS App',
  headerLeft: () => <IconButton iconName="camera" />,
  headerRight: () => (
    <HeaderRightContainer>
      <IconButton iconName="live" />
      <IconButton iconName="send" />
    </HeaderRightContainer>
  ),
};

export default MyFeed;
