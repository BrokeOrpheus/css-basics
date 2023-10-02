//Navs

  // Small Nav

let toggleSmNav = function() {
  let dialog = select(getId('sm-nav'), 'dialog');

  if (dialog.getAttribute('open') === null) {
    dialog.show();
  } else {
    dialog.close();
  }
}

window.addEventListener('load', () => {
  let links = selectAll(getId('sm-nav'), 'a');
  Object.values(links).forEach((link) => {
    link.addEventListener('click', () => {select(getId('sm-nav'), 'dialog').close()});
  })
})

select(document, 'main').addEventListener('click', () => {
  select(getId('sm-nav'), 'dialog').close();
})

  //Large Nav

let toggleLgNav = function() {
  let nav = getId('lg-nav');

  let btn = select(nav, 'button');
  btn.className = 'move-lg-nav-btn';

  let icon = select(btn, 'i');

  if (nav.className === 'hide-lg-nav') {
    nav.className = 'show-lg-nav';
    icon.className = 'fa-solid fa-chevron-left';
  } else {
    nav.className = 'hide-lg-nav';
    icon.className = 'fa-solid fa-chevron-right';
  }
}

window.addEventListener('load', () => {
  let lgNavBtn = select(getId('lg-nav'), 'button');
  lgNavBtn.addEventListener('animationend', () => resetAnimation(lgNavBtn));
})

// Animations

  // Nav Examples

let changeNav = function(id) {
  let parent = getId(id);
  let nav = select(parent, 'div');
  let btn = select(parent, 'button');

  switch(id) {
    case 'h-nav':
      if (nav.className === 'hide-h-nav') {
        nav.className = 'show-h-nav';
        btn.textContent = 'Hide nav';
      } else {
        nav.className = 'hide-h-nav';
        btn.textContent = 'Show nav';
      }
      break;
    case 'v-nav':
      if (nav.className === 'hide-v-nav') {
        nav.className = 'show-v-nav';
        btn.textContent = 'Hide nav';
      } else {
        nav.className = 'hide-v-nav';
        btn.textContent = 'Show nav';
      }
      break;
    default: console.log('nothing to see here'); break;
  }
}


  //Carousel


count = 0;

let slide = function(direction) {
  let list = selectAll(document, '#carousel-items div');
  let items = Object.values(list);

  items.forEach(div => div.className = 'off-screen');
  let current = count;
  let next = 0;
  
  switch (direction) {
    case 'left':
      items[current].className = 'slide-out-left';
      count++;
      if(count > items.length - 1) {
        count = 0;
      }
      next = count;
      items[next].className = 'slide-in-left';
      break;
    case 'right':
      items[current].className = 'slide-out-right';
      count--;
      if(count < 0) {
        count = items.length - 1;
      }
      next = count;
      items[next].className = 'slide-in-right';
      break;
    default: console.log('error');
  }
}

  // Flashbang

let overlay = getId('overlay');
let flashbang = select(getId('flashbang'), 'img');

let flash = function() {
  let voice = getId('voice');
  voice.volume = 0.25;
  voice.play();
}

let startExplosion = function() {
  let tinn = getId('explosion');
  tinn.volume = 0.25;
  tinn.play();
  flashbang.className = 'throw';

  // Interupt audio
  setTimeout(() => {
    tinn.load();
  }, 5000)

  // Start flash
  setTimeout(() => {
    overlay.className = 'flash';
  }, 2000)
}

overlay.addEventListener('animationend', () => resetAnimation(overlay));
flashbang.addEventListener('animationend', () => flashbang.className = '');

  // Modal Image

modal = getId('modal-box');


  // Rotating Btn

let toggleRotate = function() {
  let btn = select(getId('rotating-btn'), 'button');
  let animation = btn.getAnimations()[0];
  let state = animation.playState;
  switch (state) {
    case 'paused':
      btn.textContent = 'Pause Me';
      animation.play();
      break;
    case 'running':
      btn.textContent = 'Play Me';
      animation.pause();
      break;
    default: break;
  }
}


// Forms

let outputBox = getId('output-box');

let madLib = function() {
  let prompt = getValue('prompt');
  let user = getValue('user');
  
  let output = select(outputBox, 'output');
  outputBox.className = 'grow';

  const words = {
    n0: getValue('n-0'),
    n1: getValue('n-1'),
    v0: getValue('v-0'),
    v1: getValue('v-1'),
    adj0: getValue('adj-0'),
    adj1: getValue('adj-1')
  }

  const {n0, n1, v0, v1, adj0, adj1} = words;


  switch(prompt) {
    case 'goats':
      output.value = `${user} has a new pet goat. This goat is special; it has ${adj0} horns like a ${n0}. It's as ${adj1} as a ${n1}. Your new goat likes to ${v0} for hours every day and it loves to ${v1} by the garbage cans.`;
      break;

    case 'monsters':
      output.value = `${user} is being chased by a ${adj0} monster. It wants to ${v0} after it catches you. It smells as ${adj1} as a ${n0} and its gaping maw makes your ${n1} ${v1}.`;
      break;

    case 'spaghetti':
      output.value = `${user} has a ${adj0} bowl of spaghetti. It smells like a ${n0}, and makes you want to ${v0}. Before you can eat the spaghetti a giant ${n1} crawls from the pile of spaghetti and starts to ${v1}.`;
      break;

    default:
      console.log('error');
  }
}

outputBox.addEventListener('animationend', () => {
  outputBox.className = 'grown'
})


// Filter

let changeFilter = function() {
  let style = select(getId('image-box'), 'img').style;
  let inputs = selectAll(getId('filter-controls'), 'input');

  style.filter = '';

  Object.values(inputs).forEach(input => {
    let val = input.value;
    let id = input.id;
    let label = select(getId('filter-controls'), `label[for="${id}"]`);

    switch(id) {
      case 'blur':
        style.filter += `blur(${val}px) `;
        label.textContent = `Blur (${val}px)`;
        break;
      case 'bright':
        style.filter += `brightness(${val}%) `;
        label.textContent = `Brightness (${val}%)`;
        break;
      case 'contrast':
        style.filter += `contrast(${val}%) `;
        label.textContent = `Contrast (${val}%)`;
        break;
      case 'grayscale':
        style.filter += `grayscale(${val}%) `;
        label.textContent = `Grayscale (${val}%)`;
        break;
      case 'hue-rotate':
        style.filter += `hue-rotate(${val}deg) `;
        label.textContent = `Rotate Hue (${val}deg)`;
        break;
      case 'invert':
        style.filter += `invert(${val}%) `;
        label.textContent = `Invert (${val}%)`;
        break;
      case 'opacity':
        style.filter += `opacity(${val}%) `;
        label.textContent = `Opacity (${val}%)`;
        break;
      case 'saturation':
        style.filter += `saturate(${val}%) `;
        label.textContent = `Saturation (${val}%)`;
        break;
      case 'sepia':
        style.filter += `sepia(${val}%) `;
        label.textContent = `Sepia (${val}%)`;
        break;
      default: console.log('error');
    }
  })
}

window.addEventListener('load', () => {
  changeFilter();
})


// Views

let emptyPlace = function(group) {
  select(group, 'select.place').value = '';
}

let emptyJA = function(group) {
  select(group, 'select.justify').value = '';
  select(group, 'select.align').value = '';
}

let changeStyle = function(display, group, target) {
  style = display.style;
  style[`place${target}`] = null;
    
  Object.values(selectAll(group, 'select')).forEach(sel => {
    val = sel.value;
    if(val === '') {
      return;
    }

    switch(sel.classList[0]) {
      case 'justify':
        style[`justify${target}`] = val;
        break;
      case 'align':
        style[`align${target}`] = val;
        break;
      case 'place':
        style[`place${target}`] = val;
        break;
      default: console.log('error');
    }
  })
}

let changeDisplay = function(section) {
  let display = select(section, '.display');
  let controlGroups = selectAll(section, '.control-group');

  Object.values(controlGroups).forEach(group => {
    let target = '';

    switch(group.classList[1]) {
      case 'boxes':
        display.classList = `display boxes-${select(group, 'select').value}`
        break;
      case 'direction':
        display.style.flexDirection = select(group, 'select').value;
        break;
      case 'content':
        target = 'Content'
        changeStyle(display, group, target);
        break;
      case 'items':
        target = 'Items'
        changeStyle(display, group, target);
        break;
      case 'self':
        target = 'Self'
        display = select(display, '.box1');
        changeStyle(display, group, target);
        break;
      default: console.log('error');
    }
  })
}

window.addEventListener('load', () => {
  // Apply the saved inputs after a page refresh
  changeDisplay(getId('flex'));
  changeDisplay(getId('grids'));

  // Update the display after an input
  getId('flex-controls').addEventListener('input', () => {
    changeDisplay(getId('flex'));
  });
  getId('grid-controls').addEventListener('input', () => {
    changeDisplay(getId('grids'));
  });

  // Clear the 'place' select elements when changes to 'justify' and 'align' select elements are made and vice versa
  let controlGroups = selectAll(document, 'details.control-group');
  Object.values(controlGroups).forEach(group => {
    select(group, 'select.justify').addEventListener('input', () => emptyPlace(group));
    select(group, 'select.align').addEventListener('input', () => emptyPlace(group));
    select(group, 'select.place').addEventListener('input', () => emptyJA(group));
  })
});
