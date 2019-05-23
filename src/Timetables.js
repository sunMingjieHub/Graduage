(function(global) {
  let Timetables = function(option) {
    this.el = document.querySelector(option.el);
    this.Timetables = option.timetables || [];
    this.week = option.week || [];
    this.merge = typeof option.merge === 'boolean' ? option.merge : true;
    this.TimetableType = option.timetableType || [];
    this.leftHandText = [];
    this.highlightWeek = option.highlightWeek || '';
    this.gridOnClick = typeof option.gridOnClick === 'function' ? option.gridOnClick : undefined;
    let styles = option.styles || {};
    this.leftHandWidth = styles.leftHandWidth || 40;
    this.Gheight = styles.Gheight || 48;
    this.defaultPalette = ['#f05261', '#48a8e4', '#ffd061', '#52db9a', '#70d3e6', '#52db9a', '#3f51b5', '#f3d147', '#4adbc3', '#673ab7', '#f3db49', '#76bfcd', '#b495e1', '#ff9800', '#8bc34a'];
    this.palette = (typeof styles.palette === 'boolean' && !styles.palett) ? false : (styles.palette || []).concat(this.defaultPalette)
    this._init();
  };
  Timetables.prototype = {
    _init: function(option1) {
      let option = option1 || {};
      let style = option.styles || {};
      let gridOnClick = option.gridOnClick || this.gridOnClick;
      let merge = typeof option.merge === 'boolean' ? option.merge : this.merge;
      let highlightWeek = option.highlightWeek || this.highlightWeek;
      let leftHandText = this.leftHandText;
      let leftHandWidth = style.leftHandWidth || this.leftHandWidth;
      let Gheight = style.Gheight || this.Gheight;
      let palette;
      if (typeof style.palette === 'boolean' && !style.palette) {
        palette = false
      } else {
        palette = style.palette ? (style.palette || []).concat(this.defaultPalette) : this.palette;
      }

      let Timetables = option.timetables || this.Timetables;
      let week = option.week || this.week;
      let TimetableType = JSON.parse(JSON.stringify(option.timetableType || this.TimetableType));
      let deepCopyTimetableType = option.timetableType || this.TimetableType;
      let TimetableTypeLength = TimetableType.length;
      Timetables.forEach(function (item, index) {
        if(item.length < TimetableTypeLength) {
          for (let i = 0; i < TimetableTypeLength - item.length; i ++) {
            item.push('');
          }
        }
      });
      if (option.setNewOption) {
        this.el.removeChild(this.el.childNodes[0]);
      }
      let courseWrapper = document.createElement('div');
      courseWrapper.id = 'courseWrapper';
      courseWrapper.style.position = 'relative';
      courseWrapper.style.paddingLeft = leftHandWidth + 'px';
      courseWrapper.style.border = '1px solid #dbdbdb';

      TimetableType.forEach(function (item, index) {
        item.unshift(index + 1)
      });

      let leftHand = document.createElement("div");
      leftHand.className = 'Courses-leftHand';
      leftHand.style.position = 'absolute';
      leftHand.style.left = 0;
      leftHand.style.top = 0;
      leftHand.style.width = leftHandWidth + 'px';

      let timetable = Timetables[0].map(function (v, i) {
        return [];
      });
      timetable.forEach(function (item, index) {
        Timetables.forEach(function (val, i) {
          timetable[index].push(val[index]);
        });
      });

      let listMerge = [];
      if (merge) {
        Timetables.forEach(function(list, i) {
          if (!listMerge[i]){
            listMerge[i] = [];
          }
          list.forEach(function(item, index) {
            if (!index) {
              return listMerge[i].push({name: item, length: 1});
            }
            if (item === (listMerge[i][index-1] ||{}).name && item) {
              let sameIndex = (listMerge[i][index-1] ||{}).sameIndex;
              if (sameIndex || sameIndex === 0) {
                listMerge[i][sameIndex].length ++;
                return listMerge[i].push({name: item, length: 0, sameIndex: sameIndex});
              }
              listMerge[i][index-1].length ++;
              return listMerge[i].push({name: item, length: 0, sameIndex: index-1});
            } else {
              return listMerge[i].push({name: item, length: 1});
            }
          });
        });
      }

      let head = document.createElement("div");
      head.style.overflow = 'hidden';
      head.className = 'Courses-head';
      week.forEach(function (item, index) {
        let weekItem = document.createElement("div");
        let highlightClass = highlightWeek === (index + 1) ? 'highlight-week ' : '';
        weekItem.className = highlightClass + 'Courses-head-' + (index + 1);
        weekItem.innerText = item;
        weekItem.style.cssFloat = 'left';
        weekItem.style.boxSizing = 'border-box';
        weekItem.style.whiteSpace = 'nowrap';
        weekItem.style.width = 100/week.length + '%'
        head.appendChild(weekItem);
      })
      courseWrapper.appendChild(head);

      let courseListContent = document.createElement("div");
      courseListContent.className = 'Courses-content';
      let paletteIndex = 0;
      timetable.forEach(function (values, index) {
        let courseItems = document.createElement("ul");
        courseItems.style.listStyle = 'none';
        courseItems.style.padding = '0px';
        courseItems.style.margin = '0px';
        courseItems.style.minHeight = Gheight + 'px';

        courseItems.className = 'stage_' + ((TimetableType[0] || [])[0] || 'none');
        -- (TimetableType[0] || [])[2];
        if (!((TimetableType[0] || [])[2])) {
          TimetableType.shift();
        }
        values.forEach(function (item, i) {
          if (i > week.length -1) return;
          let courseItem = document.createElement("li");
          courseItem.style.cssFloat = 'left';
          courseItem.style.width = 100/week.length + '%';
          courseItem.style.height = Gheight + 'px';
          courseItem.style.fontSize = '12px'
          courseItem.style.textAlign = 'center'
          courseItem.style.boxSizing = 'border-box';
          courseItem.style.position = 'relative';
          if (merge && listMerge[i][index].length > 1) {
            let mergeDom = document.createElement("span");
            mergeDom.style.position = 'absolute';
            mergeDom.style.zIndex = 9;
            mergeDom.style.width = '100%';
            mergeDom.style.height = Gheight * listMerge[i][index].length + 'px';
            mergeDom.style.left = 0;
            mergeDom.style.top = 0;
            if (palette) {
              mergeDom.style.backgroundColor = palette[paletteIndex];
              mergeDom.style.color = '#fff';
              paletteIndex ++;
              if (paletteIndex > palette.length) {
                paletteIndex = 0;
              }
            }
            mergeDom.innerText = listMerge[i][index].name;
            mergeDom.className = 'course-hasContent'
            courseItem.appendChild(mergeDom);
          } else {
            if (merge && listMerge[i][index].length === 0) {
              courseItem.innerText = '';
            } else {
              if (item && palette) {
                courseItem.style.backgroundColor = palette[paletteIndex];
                courseItem.style.color = '#fff';
                paletteIndex ++;
                if (paletteIndex > palette.length) {
                  paletteIndex = 0;
                }
              } else if (item) {
                courseItem.className = 'course-hasContent'
              }
              courseItem.innerText = item || '';
            }
          }

          courseItem.onclick = function (e) {
            let allList = document.querySelectorAll('.Courses-content ul li').forEach(function (v, i) {
              v.classList.remove('grid-active');
            })
            this.className = 'grid-active';
            let info = {
              name:item,
              week:   week[i],
              index: index + 1,
              length: merge ? listMerge[i][index].length : 1
            };
            gridOnClick && gridOnClick(info);
          };
          courseItems.appendChild(courseItem);
        });
        courseListContent.appendChild(courseItems);
      })
      courseWrapper.appendChild(courseListContent);
      courseWrapper.appendChild(leftHand);
      this.el.appendChild(courseWrapper);

      let courseItemDomHeight = (document.querySelector('.stage_1 li') || document.querySelector('.stage_none li')).offsetHeight;
      //console.log((document.querySelector('.stage_1 li').scrollHeight))
      let coursesHeadDomHeight = 29;

      let leftHandTextDom = document.createElement("div");
      leftHandTextDom.className = 'left-hand-TextDom';
      leftHandTextDom.style.height = coursesHeadDomHeight + 'px';
      leftHandTextDom.style.boxSizing = 'border-box';

      leftHandText.forEach(function (item) {
        let leftHandTextItem = document.createElement('div');
        leftHandTextItem.innerText = item;
        leftHandTextDom.appendChild(leftHandTextItem);
      })
      leftHand.appendChild(leftHandTextDom);

      deepCopyTimetableType.forEach(function (item, index) {
        let handItem = document.createElement("div");
        handItem.style.width = '100%';
        handItem.style.textAlign= 'center'
        handItem.style.marginTop= '30px'
        handItem.style.fontSize='14px'
        handItem.style.height ='120px';
        handItem.style.boxSizing = 'border-box';
        if (typeof item[0] === 'object') {
          for (let v in item[0]) {
            let handItemInner = document.createElement('p');
            handItemInner.innerText = item[0][v];
            handItemInner.style.margin = '0px';
            handItemInner.className = 'left-hand-' + v;
            handItem.appendChild(handItemInner);
          }
        } else {
          handItem.innerText = item[0] || '';
        }
        handItem.className = 'left-hand-' + (index + 1);
        leftHand.appendChild(handItem);
      });
    },
    setOption: function(option) {
      (option || {}).setNewOption = true;
      this._init(option);
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = Timetables;
  if (typeof define === 'function') define(function() { return Timetables; });
  global.Timetables = Timetables;
})(this);
