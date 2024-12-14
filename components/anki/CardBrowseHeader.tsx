import Dropdown from '@/components/ui/Dropdown';
import { View, TextInput, Keyboard } from 'react-native';
import AntDesignIconButton from '@/components/ui/AntDesignIconButton';
import { useMemo, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { useAnkiContext } from '@/context/ankiContext';

const CardBrowseHeader = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [localSearchText, setLocalSearchText] = useState('');
  const router = useRouter();
  const { setBrowseSearch, setCurDeckId, decks, curDeckId, browseLoading } =
    useAnkiContext();
  const mappedDecks = useMemo(() => {
    return decks.map(({ id, name }) => ({ value: String(id), label: name }));
  }, [decks]);

  const handleSearchIconClicked = () => {
    if (!isSearch) {
      setIsSearch(true);
    } else {
      Keyboard.dismiss();
    }
  };

  const handleBackIconClicked = () => {
    if (isSearch) {
      setIsSearch(false);
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const handleLocalSearchTextChanged = useMemo(() => {
    let timeoutId: NodeJS.Timeout;

    return (text: string) => {
      clearTimeout(timeoutId);
      setLocalSearchText(text);
      timeoutId = setTimeout(() => {
        setBrowseSearch(text);
      }, 1000);
    };
  }, []);

  const handleChangeDeck = (deckId: string) => {
    setCurDeckId(Number.parseInt(deckId));
  };

  return (
    <View className='bg-primary-foreground flex-row gap-2 items-center px-2 h-[44px] shadow'>
      <AntDesignIconButton
        iconName='arrowleft'
        onPress={handleBackIconClicked}
        disabled={browseLoading}
      />
      {isSearch ? (
        <TextInput
          className='flex-grow caret-primary text-lg placeholder:text-gray-400 text-text'
          placeholder='Tìm kiếm'
          autoFocus
          value={localSearchText}
          onChangeText={handleLocalSearchTextChanged}
        />
      ) : (
        <>
          <Dropdown
            data={mappedDecks}
            iconName='book'
            onChange={handleChangeDeck}
            value={String(curDeckId)}
            disabled={browseLoading}
          />
          <Link
            href={{
              pathname: '/(main)/(anki)/card',
              params: { fromPath: 'browse' },
            }}
            asChild>
            <AntDesignIconButton iconName='plus' disabled={browseLoading} />
          </Link>
        </>
      )}
      <AntDesignIconButton
        iconName='search1'
        onPress={handleSearchIconClicked}
        disabled={browseLoading}
      />
    </View>
  );
};
export default CardBrowseHeader;
