import { useCallback, useContext, useMemo, useState } from 'react';

import { useIntl } from 'react-intl';

import { ToggleButtonGroup } from '@onekeyhq/components';

import { useTranslation } from '../../../../hooks';
import { useCategories } from '../../hooks';
import { DiscoverContext } from '../context';

import type { CatagoryType } from '../../type';

export const DAppCategories = () => {
  const intl = useIntl();
  const { categoryId, setCategoryId } = useContext(DiscoverContext);
  const categories = useCategories();
  const t = useTranslation();

  const data = useMemo(() => {
    if (!categories) {
      return [];
    }
    return [{ name: intl.formatMessage({ id: 'msg__mine' }), _id: '' }].concat(
      categories,
    ) as CatagoryType[];
  }, [categories, intl]);

  const [selectedIndex, setSelectedIndex] = useState(() =>
    data.findIndex((item) => item._id === categoryId),
  );

  const onButtonPress = useCallback(
    (index: number) => {
      const id = data[index]._id;
      setCategoryId(id);
      setSelectedIndex(index);
    },
    [data, setCategoryId],
  );

  const buttons = useMemo(
    () =>
      // eslint-disable-next-line arrow-body-style
      data.map((item) => {
        // Hiện tại API trả về translations cho tiếng việt đang bị lỗi, không thể chỉnh
        // trực tiếp trong file json được, nên hiển thị mặc định là tiếng anh luôn
        return { text: item.name };
        // return { text: t(item._name) ?? item.name };
      }, []),
    [data, t],
  );

  if (!data.length) {
    return null;
  }
  return (
    <ToggleButtonGroup
      px="4"
      buttons={buttons}
      selectedIndex={selectedIndex}
      onButtonPress={onButtonPress}
      bg="background-default"
    />
  );
};