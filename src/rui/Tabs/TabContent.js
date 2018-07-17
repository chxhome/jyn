// 然后是 TabContent 组件，仔细对比它与前者的不同。再次推敲 TabContent 组件中的 getTab-
// Panes 方法，看似简单，实则精妙：
import React, { Component } from 'react';
import PropTypes from "prop-types";
import classnames from 'classnames';
class TabContent extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
  }

  getTabPanes() {
    const { classPrefix, activeIndex, panels } = this.props;
    return React.Children.map(panels, (child) => {
      if (!child) { return; }
      const order = parseInt(child.props.order, 10);
      const isActive = activeIndex === order;
      return React.cloneElement(child, {
        classPrefix,
        isActive,
        children: child.props.children,
        key: `tabpane-${order}`,
      });
    });
  }

  render() {
    const { classPrefix } = this.props;
    const classes = classnames({
      [`${classPrefix}-content`]: true,
    });
    return (
      <div className={classes}>
        {this.getTabPanes()}
      </div>
    );
  }
}

export default TabContent;