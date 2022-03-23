import React, { useMemo, memo } from 'react';
import IconText from './IconText';

export type StatusIconProps = {
  status?: string;
  style?: any;
};

const DEFAULT_STYLE = {
  fontSize: '12px',
  lineHeight: '14px',
  padding: '4px 8px',
  borderRadius: '4px',
  verticalAlign: 'middle',
  textTransform: 'capitalize'
};

const StatusIcon = ({ status, style = {} }: StatusIconProps) => {
  const statusIconStyle = useMemo(() => {
    let iconStyle = {};
    switch (status.toLowerCase()) {
      case 'failed':
        iconStyle = { color: 'var(--theme-red-text)', backgroundColor: 'var(--theme-red-background)' };
        break;
      case 'succeeded':
        iconStyle = { color: 'var(--theme-green-text)', backgroundColor: 'var(--theme-green-background)' };
        break;
      case 'stopped':
        iconStyle = { color: 'var(--theme-red-text)', backgroundColor: 'var(--theme-red-background)' };
        break;
      case 'partiallysucceeded':
        iconStyle = { color: 'var(--theme-green-text)', backgroundColor: 'var(--theme-green-background)' };
        break;
      default: {
        iconStyle = { color: 'var(--theme-green-text)', backgroundColor: 'var(--theme-green-background)' };
        break;
      }
    }
    return {
      ...DEFAULT_STYLE,
      ...style,
      ...iconStyle
    };
  }, [style]);

  return <IconText icon="fa-solid fa-check-circle" text={status} style={{ ...statusIconStyle }} />;
};

export default memo(StatusIcon);
