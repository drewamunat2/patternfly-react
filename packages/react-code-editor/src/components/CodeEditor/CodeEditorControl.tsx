import * as React from 'react';
import { Button, ButtonProps, PopoverPosition, Tooltip } from '@patternfly/react-core';
import { CodeEditorContext } from './CodeEditorUtils';

export interface CodeEditorControlProps extends Omit<ButtonProps, 'onClick'> {
  /** icon rendered inside the code editor control */
  icon: React.ReactNode;
  /** additional classes added to the Code editor control */
  className?: string;
  /** accessible label for the code editor control */
  'aria-label'?: string;
  /** Text to display in the tooltip*/
  toolTipText: React.ReactNode;
  /** Copy button popover position. */
  position?:
    | PopoverPosition
    | 'auto'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  /** Maximum width of the tooltip (default 150px). */
  maxWidth?: string;
  /** Delay in ms before the tooltip disappears. */
  exitDelay?: number;
  /** Delay in ms before the tooltip appears. */
  entryDelay?: number;
  /** Event handler for the click of the button */
  onClick: (code: string, event?: any) => void;
  /** Flag indicating that the button is visible above the code editor */
  isVisible?: boolean;
}

export const CodeEditorControl: React.FunctionComponent<CodeEditorControlProps> = ({
  icon,
  className,
  'aria-label': ariaLabel,
  toolTipText,
  exitDelay = 0,
  entryDelay = 300,
  maxWidth = '100px',
  position = 'top',
  onClick = () => {},
  isVisible = true,
  ...props
}: CodeEditorControlProps) => {
  const context = React.useContext(CodeEditorContext);

  const onCustomClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick(context.code, event);
  };

  return isVisible ? (
    <Tooltip
      trigger="mouseenter focus click"
      exitDelay={exitDelay}
      entryDelay={entryDelay}
      maxWidth={maxWidth}
      position={position}
      content={<div>{toolTipText}</div>}
    >
      <Button className={className} onClick={onCustomClick} variant="control" aria-label={ariaLabel} {...props}>
        {icon}
      </Button>
    </Tooltip>
  ) : null;
};

CodeEditorControl.displayName = 'CodeEditorControl';
