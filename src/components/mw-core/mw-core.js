(function (global) {
  'use strict'

  var THEME = {
    colors: {
      black: '#000000',
      blue: '#3b708e',
      bronze: '#7A4D05',
      brown: '#9F3A38',
      darkBlue: '#192338',
      darkestBlue: '#121B2E',
      darkGreen: '#129105',
      darkGrey: '#949494',
      darkSilver: '#525A6A',
      ghostWhite: '#F9FAFB',
      green: '#76B100',
      grey: '#ADADAD',
      greyishBlue: '#263046',
      lightBlue: '#2D9AFF',
      lightestGrey: '#E2E2E3',
      lightGreen: '#66BB6A',
      lightGrey: '#C8C8C8',
      orange: '#FB8702',
      pink: '#E23851',
      purple: '#8E66BB',
      red: '#C31717',
      silver: '#B2B2B2',
      warningRed: '#EF5350',
      warningYellow: '#FBCF30',
      white: '#FFFFFF',
      yellow: '#FBCB01',
    },
    spacings: {
      s1: '7px',
      s2: '8px',
      s3: '14px',
      s4: '21px',
      s5: '28px',
      s6: '35px',
    },
    sizes: {
      mini: { fontSize: '11px', lineHeight: '13px', minWidth: '51px', minHeight: '28px' },
      tiny: { fontSize: '13px', lineHeight: '16px', minWidth: '62px', minHeight: '34px' },
      small: { fontSize: '14px', lineHeight: '17px', minWidth: '74px', minHeight: '35px' },
      large: { fontSize: '16px', lineHeight: '19px', minWidth: '89px', minHeight: '43px' },
      big: { fontSize: '18px', lineHeight: '22px', minWidth: '79px', minHeight: '52px' },
    },
  }

  var ICONS = {
    calendar:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m20 6-11 11-5-5"></path></svg>',
    chevronDown:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"></path></svg>',
    chevronLeft:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"></path></svg>',
    chevronRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"></path></svg>',
    eye:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    eyeOff:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 3 18 18"></path><path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"></path><path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.76 21.76 0 0 1-5.17 5.94"></path><path d="M6.71 6.72C3.9 8.4 1 12 1 12a21.8 21.8 0 0 0 8.29 7.28"></path></svg>',
    externalLink:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7"></path><path d="M10 14 21 3"></path><path d="M21 14v7H3V3h7"></path></svg>',
    filter:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h18"></path><path d="M6 12h12"></path><path d="M10 19h4"></path></svg>',
    info:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>',
    loader:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.22-8.56"></path></svg>',
    menu:
      '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="12" cy="19" r="2"></circle></svg>',
    minus:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path></svg>',
    plus:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
    warning:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"></path><path d="M12 17h.01"></path><path d="m10.29 3.86-8.2 14.2A2 2 0 0 0 3.82 21h16.36a2 2 0 0 0 1.73-2.94l-8.2-14.2a2 2 0 0 0-3.42 0Z"></path></svg>',
    zoomIn:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path><path d="M11 8v6M8 11h6"></path></svg>',
  }

  var MODAL_SIZES = {
    small: {
      width: '642.5px',
      height: '356.4px',
    },
    medium: {
      width: '1010px',
      height: '549px',
    },
    large: {
      width: '1095px',
      height: '600px',
    },
  }

  function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]'
  }

  function isNode(value) {
    return typeof Node !== 'undefined' && value instanceof Node
  }

  function toArray(value) {
    if (value === null || value === undefined || value === false) return []
    return Array.isArray(value) ? value : [value]
  }

  function buildClassName(parts) {
    return parts.filter(Boolean).join(' ')
  }

  function createElement(tagName, className, text) {
    var element = document.createElement(tagName)
    if (className) element.className = className
    if (text !== undefined && text !== null) element.textContent = String(text)
    return element
  }

  function clearElement(element) {
    while (element.firstChild) element.removeChild(element.firstChild)
  }

  function appendContent(target, content) {
    toArray(content).forEach(function (value) {
      if (value === null || value === undefined || value === false) return

      if (isNode(value)) {
        target.appendChild(value)
        return
      }

      if (Array.isArray(value)) {
        appendContent(target, value)
        return
      }

      if (isObject(value) && Object.prototype.hasOwnProperty.call(value, 'html')) {
        var fragment = document.createElement('div')
        fragment.innerHTML = String(value.html)
        while (fragment.firstChild) target.appendChild(fragment.firstChild)
        return
      }

      target.appendChild(document.createTextNode(String(value)))
    })
  }

  function html(value) {
    return { html: value }
  }

  function resolveTarget(target) {
    if (typeof target === 'string') return document.querySelector(target)
    if (isNode(target)) return target
    if (target && target.element && isNode(target.element)) return target.element
    return null
  }

  function getMountable(item) {
    if (item && item.element && isNode(item.element)) return item.element
    return item
  }

  function mount(target, item, options) {
    var node = resolveTarget(target)
    if (!node) throw new Error('FinacUIMWCore: target nao encontrado.')

    var settings = Object.assign({ replace: true }, options || {})
    if (settings.replace) clearElement(node)
    node.appendChild(getMountable(item))
    return item
  }

  function createInstance(element, methods) {
    return Object.assign({ element: element }, methods || {})
  }

  function getThemeColor(color) {
    if (!color) return THEME.colors.greyishBlue
    return THEME.colors[color] || color
  }

  function getContrastColor(color, ifDark, ifLight) {
    var hex = getThemeColor(color).replace('#', '')
    if (hex.length !== 6) return getThemeColor(ifDark || 'white')

    var red = parseInt(hex.substring(0, 2), 16)
    var green = parseInt(hex.substring(2, 4), 16)
    var blue = parseInt(hex.substring(4, 6), 16)
    var luminosity = (red * 299 + green * 587 + blue * 114) / 1000

    return getThemeColor(luminosity <= 128 ? ifDark || 'white' : ifLight || 'black')
  }

  function normalizeButtonAppearance(appearance) {
    if (!appearance) return 'solid'
    if (appearance === 'outline') return 'bordered'
    if (appearance === 'ghost') return 'borderless'
    return appearance
  }

  function getSize(size) {
    return THEME.sizes[size] || THEME.sizes.small
  }

  function createIcon(config) {
    var settings = Object.assign(
      {
        icon: 'info',
        size: 18,
        color: 'greyishBlue',
      },
      config || {},
    )
    var wrapper = createElement('span', buildClassName(['gumw-icon', settings.className]))
    wrapper.style.width = String(settings.size) + (String(settings.size).indexOf('px') === -1 ? 'px' : '')
    wrapper.style.height = wrapper.style.width
    wrapper.style.color = getThemeColor(settings.color)
    wrapper.setAttribute('aria-hidden', 'true')
    wrapper.innerHTML = ICONS[settings.icon] || settings.icon || ICONS.info
    if (typeof settings.onClick === 'function') {
      wrapper.classList.add('is-clickable')
      wrapper.addEventListener('click', settings.onClick)
    }
    return wrapper
  }

  function createLoader(config) {
    var settings = Object.assign(
      {
        size: '24px',
        color: 'blue',
        bgColor: 'lightestGrey',
      },
      config || {},
    )
    var loader = createElement('span', buildClassName(['gumw-loader', settings.className]))
    loader.style.setProperty('--gumw-loader-size', settings.size)
    loader.style.setProperty('--gumw-loader-color', getThemeColor(settings.color))
    loader.style.setProperty('--gumw-loader-track', getThemeColor(settings.bgColor))
    return loader
  }

  function createButton(config) {
    var settings = Object.assign(
      {
        type: 'button',
        content: 'Button',
        size: 'small',
        appearance: 'solid',
        color: 'blue',
        loading: false,
      },
      config || {},
    )
    var appearance = normalizeButtonAppearance(settings.appearance)
    var size = getSize(settings.size)
    var button = createElement(
      settings.href ? 'a' : 'button',
      buildClassName([
        'gumw-button',
        'gumw-button-' + appearance,
        settings.className,
      ]),
    )
    button.style.setProperty('--gumw-button-color', getThemeColor(settings.color))
    button.style.setProperty('--gumw-button-text', getThemeColor(settings.color))
    button.style.fontSize = size.fontSize
    button.style.lineHeight = size.lineHeight
    button.style.minWidth = size.minWidth
    button.style.minHeight = size.minHeight
    if (settings.href) button.href = settings.href
    if (!settings.href) button.type = settings.type || 'button'
    if (settings.disabled) button.disabled = true

    var content = createElement('span', 'gumw-button-content')
    appendContent(content, settings.content)
    button.appendChild(content)

    if (settings.icon) {
      button.insertBefore(
        createIcon(
          Object.assign(
            {
              size: 16,
              color: appearance === 'solid' ? 'white' : settings.color,
            },
            settings.icon,
          ),
        ),
        content,
      )
    }

    if (settings.loading) {
      button.classList.add('is-loading')
      button.appendChild(
        createLoader({
          size: '16px',
          color: appearance === 'solid' ? 'white' : settings.color,
          bgColor: appearance === 'solid' ? 'white' : 'lightestGrey',
        }),
      )
    }

    if (typeof settings.onClick === 'function' && !settings.disabled) {
      button.addEventListener('click', function (event) {
        settings.onClick(event, settings)
      })
    }

    return button
  }

  function createLink(config) {
    var settings = Object.assign(
      {
        content: 'Link',
        color: 'greyishBlue',
        size: 'small',
      },
      config || {},
    )
    var size = getSize(settings.size)
    var link = createElement(settings.href ? 'a' : 'button', buildClassName(['gumw-link', settings.className]))
    link.style.color = getThemeColor(settings.color)
    link.style.fontSize = size.fontSize
    link.style.lineHeight = size.lineHeight
    appendContent(link, settings.content)
    if (settings.href) {
      link.href = settings.href
      if (settings.target) link.target = settings.target
    } else {
      link.type = 'button'
    }
    if (settings.disabled) link.classList.add('is-disabled')
    if (typeof settings.onClick === 'function' && !settings.disabled) {
      link.addEventListener('click', function (event) {
        if (!settings.href) event.preventDefault()
        settings.onClick(event, settings)
      })
    }
    return link
  }

  function createIndicator(config) {
    var settings = Object.assign(
      {
        label: 'Indicator',
        type: 'default',
      },
      config || {},
    )
    var indicator = createElement(
      'span',
      buildClassName(['gumw-indicator', 'gumw-indicator-' + settings.type, settings.className]),
    )
    var dot = createElement('span', 'gumw-indicator-dot')
    var label = createElement('span', 'gumw-indicator-label')
    appendContent(label, settings.label)
    indicator.appendChild(dot)
    indicator.appendChild(label)
    return indicator
  }

  function createCard(config) {
    var settings = Object.assign(
      {
        size: 'small',
        borderType: 'default',
      },
      config || {},
    )
    var card = createElement(
      'article',
      buildClassName(['gumw-card', 'gumw-card-' + settings.borderType, settings.className]),
    )
    card.setAttribute('data-size', settings.size)

    if (settings.header || settings.title) {
      var header = createElement('div', 'gumw-card-header')
      appendContent(header, settings.header || settings.title)
      card.appendChild(header)
    }

    var body = createElement('div', 'gumw-card-body')
    appendContent(body, settings.content || settings.body || '')
    card.appendChild(body)

    if (settings.footer) {
      var footer = createElement('div', 'gumw-card-footer')
      appendContent(footer, settings.footer)
      card.appendChild(footer)
    }

    return card
  }

  function buildFieldShell(config, control) {
    var settings = config || {}
    var shell = createElement('label', buildClassName(['gumw-field', settings.className]))
    if (settings.disabled) shell.classList.add('is-disabled')
    if (settings.invalid) shell.classList.add('is-invalid')

    if (settings.label) {
      var label = createElement('span', 'gumw-field-label')
      appendContent(label, settings.label)
      if (settings.required) label.appendChild(createElement('span', 'gumw-field-required', '*'))
      shell.appendChild(label)
    }

    shell.appendChild(control)

    if (settings.helpText) {
      var help = createElement('span', 'gumw-field-help')
      appendContent(help, settings.helpText)
      shell.appendChild(help)
    }

    return shell
  }

  function emitChange(handler, payload) {
    if (typeof handler === 'function') handler(payload)
  }

  function formatPhone(value) {
    var digits = String(value || '').replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 6) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2)
    if (digits.length <= 10) {
      return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6)
    }
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7)
  }

  function createInput(config) {
    var settings = Object.assign(
      {
        type: 'text',
        placeholder: '',
        value: '',
      },
      config || {},
    )
    var inputType = settings.type
    if (inputType === 'switch') inputType = 'checkbox'
    if (inputType === 'phone') inputType = 'tel'

    var control = createElement(
      'div',
      buildClassName([
        'gumw-input-shell',
        settings.type === 'switch' ? 'is-switch' : '',
        settings.type === 'checkbox' || settings.type === 'radio' ? 'is-checklike' : '',
      ]),
    )
    var input = createElement('input', 'gumw-input-control')
    input.type = inputType
    input.name = settings.name || ''
    input.placeholder = settings.placeholder || ''
    input.disabled = !!settings.disabled
    input.readOnly = !!settings.readOnly
    if (settings.type === 'checkbox' || settings.type === 'radio' || settings.type === 'switch') {
      input.checked = !!settings.checked
    } else {
      input.value = settings.value || ''
    }

    if (settings.icon) {
      control.appendChild(
        createIcon(
          Object.assign(
            {
              size: 18,
              color: settings.invalid ? 'warningRed' : 'grey',
            },
            settings.icon,
          ),
        ),
      )
    }

    control.appendChild(input)

    if (settings.clearable && settings.type !== 'checkbox' && settings.type !== 'radio' && settings.type !== 'switch') {
      var clearButton = createButton({
        appearance: 'ghost',
        color: 'grey',
        size: 'mini',
        content: createIcon({ icon: 'close', size: 14 }),
        className: 'gumw-input-clear',
        onClick: function (event) {
          event.preventDefault()
          input.value = ''
          emit()
        },
      })
      control.appendChild(clearButton)
    }

    if (settings.type === 'password') {
      var toggle = createButton({
        appearance: 'ghost',
        color: 'grey',
        size: 'mini',
        content: createIcon({ icon: 'eye', size: 14 }),
        className: 'gumw-input-clear',
        onClick: function (event) {
          event.preventDefault()
          input.type = input.type === 'password' ? 'text' : 'password'
          clearElement(toggle)
          toggle.appendChild(
            createIcon({ icon: input.type === 'password' ? 'eye' : 'eyeOff', size: 14 }),
          )
        },
      })
      control.appendChild(toggle)
    }

    if (settings.type === 'checkbox' || settings.type === 'radio' || settings.type === 'switch') {
      var inlineLabel = createElement('span', 'gumw-input-inline-label')
      appendContent(inlineLabel, settings.content || settings.placeholder || settings.label || '')
      control.appendChild(inlineLabel)
    }

    function getValue() {
      if (settings.type === 'checkbox' || settings.type === 'radio' || settings.type === 'switch') {
        return !!input.checked
      }
      return input.value
    }

    function setValue(value) {
      if (settings.type === 'checkbox' || settings.type === 'radio' || settings.type === 'switch') {
        input.checked = !!value
        return
      }
      input.value = value === null || value === undefined ? '' : String(value)
    }

    function emit() {
      if (settings.type === 'phone') input.value = formatPhone(input.value)
      emitChange(settings.onChange, {
        value: getValue(),
        input: input,
        element: shell,
      })
    }

    input.addEventListener('input', emit)
    input.addEventListener('change', emit)

    var shell = buildFieldShell(settings, control)
    return createInstance(shell, {
      input: input,
      getValue: getValue,
      setValue: setValue,
      focus: function () {
        input.focus()
      },
    })
  }

  function createTextArea(config) {
    var settings = Object.assign(
      {
        value: '',
        rows: 5,
      },
      config || {},
    )
    var area = createElement('textarea', 'gumw-textarea')
    area.name = settings.name || ''
    area.placeholder = settings.placeholder || ''
    area.rows = settings.rows || 5
    area.disabled = !!settings.disabled
    area.readOnly = !!settings.readOnly
    area.value = settings.value || ''

    var shell = buildFieldShell(settings, area)
    var counter = null

    function refreshCounter() {
      if (!settings.maxLength) return
      if (!counter) {
        counter = createElement('span', 'gumw-field-counter')
        shell.appendChild(counter)
      }
      counter.textContent = String(area.value.length) + '/' + String(settings.maxLength)
    }

    area.addEventListener('input', function () {
      refreshCounter()
      emitChange(settings.onChange, {
        value: area.value,
        textarea: area,
        element: shell,
      })
    })

    if (settings.maxLength) area.maxLength = settings.maxLength
    refreshCounter()

    return createInstance(shell, {
      textarea: area,
      getValue: function () {
        return area.value
      },
      setValue: function (value) {
        area.value = value === null || value === undefined ? '' : String(value)
        refreshCounter()
      },
    })
  }

  function createOption(option, value) {
    var node = document.createElement('option')
    node.value = option.value
    node.selected = Array.isArray(value)
      ? value.indexOf(option.value) !== -1
      : String(option.value) === String(value)
    appendContent(node, option.label || option.content || option.value)
    return node
  }

  function createSelect(config) {
    var settings = Object.assign(
      {
        options: [],
        value: '',
        multiple: false,
      },
      config || {},
    )
    var select = createElement('select', 'gumw-select-control')
    select.name = settings.name || ''
    select.disabled = !!settings.disabled
    select.multiple = !!settings.multiple
    if (settings.multiple && settings.size) select.size = settings.size

    if (!settings.multiple && settings.placeholder) {
      var placeholder = document.createElement('option')
      placeholder.value = ''
      placeholder.disabled = !!settings.required
      placeholder.selected = settings.value === '' || settings.value === null || settings.value === undefined
      placeholder.textContent = settings.placeholder
      select.appendChild(placeholder)
    }

    toArray(settings.options).forEach(function (option) {
      select.appendChild(createOption(option, settings.value))
    })

    var shell = buildFieldShell(settings, select)

    select.addEventListener('change', function () {
      emitChange(settings.onChange, {
        value: instance.getValue(),
        select: select,
        element: shell,
      })
    })

    var instance = createInstance(shell, {
      select: select,
      getValue: function () {
        if (!select.multiple) return select.value
        return Array.prototype.slice
          .call(select.selectedOptions)
          .map(function (option) {
            return option.value
          })
      },
      setValue: function (value) {
        Array.prototype.slice.call(select.options).forEach(function (option) {
          option.selected = Array.isArray(value)
            ? value.indexOf(option.value) !== -1
            : String(option.value) === String(value)
        })
      },
    })

    return instance
  }

  function formatDateLabel(value) {
    if (!value) return 'Sem data'
    var parts = String(value).split('-')
    if (parts.length !== 3) return value
    return parts[2] + '/' + parts[1] + '/' + parts[0]
  }

  function shiftDate(value, amount) {
    var date = value ? new Date(value + 'T00:00:00') : new Date()
    date.setDate(date.getDate() + amount)
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-')
  }

  function createCalendar(config) {
    var settings = Object.assign(
      {
        mode: 'single',
        value: '',
        values: ['', ''],
      },
      config || {},
    )
    var wrapper = createElement('div', buildClassName(['gumw-calendar', settings.className]))
    var header = createElement('div', 'gumw-calendar-toolbar')
    var summary = createElement('div', 'gumw-calendar-summary')

    var left = createButton({
      appearance: 'ghost',
      size: 'mini',
      color: 'grey',
      content: createIcon({ icon: 'chevronLeft', size: 14 }),
    })
    var right = createButton({
      appearance: 'ghost',
      size: 'mini',
      color: 'grey',
      content: createIcon({ icon: 'chevronRight', size: 14 }),
    })
    header.appendChild(left)
    header.appendChild(summary)
    header.appendChild(right)
    wrapper.appendChild(header)

    var body = createElement('div', 'gumw-calendar-inputs')
    wrapper.appendChild(body)

    var inputs = []
    if (settings.mode === 'interval') {
      ;['Data inicial', 'Data final'].forEach(function (label, index) {
        var instance = createInput({
          label: label,
          type: 'date',
          value: (settings.values || ['', ''])[index] || '',
          onChange: refresh,
        })
        inputs.push(instance)
        body.appendChild(instance.element)
      })
    } else {
      var single = createInput({
        label: settings.label || 'Data',
        type: 'date',
        value: settings.value || '',
        onChange: refresh,
      })
      inputs.push(single)
      body.appendChild(single.element)
    }

    function getValue() {
      if (settings.mode === 'interval') {
        return [inputs[0].getValue(), inputs[1].getValue()]
      }
      return inputs[0].getValue()
    }

    function setValue(value) {
      if (settings.mode === 'interval') {
        value = Array.isArray(value) ? value : ['', '']
        inputs[0].setValue(value[0] || '')
        inputs[1].setValue(value[1] || '')
      } else {
        inputs[0].setValue(value || '')
      }
      refresh()
    }

    function refresh() {
      var value = getValue()
      summary.textContent = Array.isArray(value)
        ? formatDateLabel(value[0]) + ' - ' + formatDateLabel(value[1])
        : formatDateLabel(value)
      emitChange(settings.onChange, {
        value: value,
        element: wrapper,
      })
    }

    function shift(amount) {
      var value = getValue()
      if (Array.isArray(value)) {
        setValue([shiftDate(value[0], amount), shiftDate(value[1], amount)])
      } else {
        setValue(shiftDate(value, amount))
      }
    }

    left.addEventListener('click', function () {
      shift(-1)
    })
    right.addEventListener('click', function () {
      shift(1)
    })
    refresh()

    return createInstance(wrapper, {
      getValue: getValue,
      setValue: setValue,
      shift: shift,
      inputs: inputs,
    })
  }

  function getMenuPortal() {
    var portal = document.querySelector('[data-gumw-menu-portal]')
    if (portal) return portal
    portal = createElement('div', 'gumw-menu-portal')
    portal.setAttribute('data-gumw-menu-portal', 'true')
    document.body.appendChild(portal)
    return portal
  }

  function closeMenus(event) {
    Array.prototype.slice
      .call(document.querySelectorAll('.gumw-menu-popover.is-open'))
      .forEach(function (popover) {
        if (event && popover.contains(event.target)) return
        if (event && popover.__trigger && popover.__trigger.contains(event.target)) return
        popover.classList.remove('is-open')
      })
  }

  document.addEventListener('mousedown', closeMenus)
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenus()
  })

  function createMenuOption(option, instance) {
    var failedRule = null
    toArray(option.rules).forEach(function (rule) {
      if (failedRule) return
      var result = typeof rule === 'function' ? rule() : rule.rule()
      if (result === true) return
      failedRule = isObject(result) ? result : { content: 'Opcao indisponivel' }
    })

    var button = createElement('button', 'gumw-menu-item')
    button.type = 'button'
    button.disabled = !!(option.disabled || failedRule)
    appendContent(button, option.label || option.content)
    if (failedRule && failedRule.content) button.title = String(failedRule.content)

    if (!button.disabled) {
      button.addEventListener('click', function (event) {
        if (typeof option.onClick === 'function') option.onClick(event, option.data, instance)
        if (option.closeOnClick !== false) instance.close()
      })
    }

    return button
  }

  function createMenu(config) {
    var settings = Object.assign(
      {
        triggerLabel: 'Menu',
        options: [],
      },
      config || {},
    )
    var wrapper = createElement('div', buildClassName(['gumw-menu', settings.className]))
    var trigger = settings.trigger
      ? getMountable(settings.trigger)
      : createButton({
          content: settings.triggerLabel,
          appearance: settings.triggerAppearance || 'ghost',
          color: settings.triggerColor || 'greyishBlue',
          size: settings.triggerSize || 'small',
          icon: settings.triggerIcon || { icon: 'chevronDown', size: 14 },
        })
    trigger.classList.add('gumw-menu-trigger')
    wrapper.appendChild(trigger)

    var portal = getMenuPortal()
    var popover = createElement('div', 'gumw-menu-popover')
    popover.__trigger = trigger
    var list = createElement('div', 'gumw-menu-list')
    toArray(settings.options).forEach(function (option) {
      list.appendChild(createMenuOption(option, instance))
    })
    popover.appendChild(list)
    portal.appendChild(popover)

    function position() {
      var rect = trigger.getBoundingClientRect()
      popover.style.left = rect.left + 'px'
      popover.style.top = rect.bottom + 8 + 'px'
      popover.style.minWidth = (settings.width || rect.width) + 'px'
    }

    function open() {
      closeMenus()
      position()
      popover.classList.add('is-open')
    }

    function close() {
      popover.classList.remove('is-open')
    }

    trigger.addEventListener('click', function (event) {
      event.preventDefault()
      if (popover.classList.contains('is-open')) close()
      else open()
    })

    var instance = createInstance(wrapper, {
      trigger: trigger,
      popover: popover,
      open: open,
      close: close,
      destroy: function () {
        if (popover.parentNode) popover.parentNode.removeChild(popover)
        if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper)
      },
    })

    clearElement(list)
    toArray(settings.options).forEach(function (option) {
      list.appendChild(createMenuOption(option, instance))
    })

    return instance
  }

  function createChip(label, onRemove) {
    var chip = createElement('span', 'gumw-chip')
    var text = createElement('span', 'gumw-chip-label')
    appendContent(text, label)
    chip.appendChild(text)
    if (typeof onRemove === 'function') {
      var remove = createButton({
        appearance: 'ghost',
        color: 'grey',
        size: 'mini',
        className: 'gumw-chip-remove',
        content: createIcon({ icon: 'close', size: 12 }),
        onClick: function (event) {
          event.preventDefault()
          onRemove()
        },
      })
      chip.appendChild(remove)
    }
    return chip
  }

  function createFilters(config) {
    var settings = Object.assign(
      {
        filters: [],
        search: true,
        searchPlaceholder: 'Pesquisar',
      },
      config || {},
    )
    var wrapper = createElement('section', buildClassName(['gumw-filters', settings.className]))
    var toolbar = createElement('div', 'gumw-filters-toolbar')
    var chips = createElement('div', 'gumw-filters-chips')
    wrapper.appendChild(toolbar)
    wrapper.appendChild(chips)

    var state = {
      search: settings.searchValue || '',
      values: {},
    }

    var searchField = null
    if (settings.search !== false) {
      searchField = createInput({
        label: settings.searchLabel || 'Busca',
        type: 'search',
        placeholder: settings.searchPlaceholder,
        value: state.search,
        icon: { icon: 'search' },
        clearable: true,
        onChange: function (payload) {
          state.search = payload.value
          renderChips()
          notify()
        },
      })
      toolbar.appendChild(searchField.element)
    }

    var selects = {}
    function findFilterByName(name) {
      var filters = toArray(settings.filters)
      for (var index = 0; index < filters.length; index += 1) {
        if (filters[index].name === name) return filters[index]
      }
      return null
    }

    function findOptionByValue(options, value) {
      var entries = toArray(options)
      for (var index = 0; index < entries.length; index += 1) {
        if (String(entries[index].value) === String(value)) return entries[index]
      }
      return null
    }

    toArray(settings.filters).forEach(function (filter) {
      state.values[filter.name] = filter.value !== undefined ? filter.value : ''
      var select = createSelect({
        label: filter.label,
        name: filter.name,
        placeholder: filter.placeholder || 'Todos',
        options: filter.options || [],
        value: state.values[filter.name],
        onChange: function (payload) {
          state.values[filter.name] = payload.value
          renderChips()
          notify()
        },
      })
      selects[filter.name] = select
      toolbar.appendChild(select.element)
    })

    var clearAll = createButton({
      content: 'Limpar filtros',
      size: 'small',
      appearance: 'ghost',
      color: 'grey',
      onClick: function () {
        state.search = ''
        if (searchField) searchField.setValue('')
        Object.keys(selects).forEach(function (name) {
          state.values[name] = ''
          selects[name].setValue('')
        })
        renderChips()
        notify()
      },
    })
    toolbar.appendChild(clearAll)

    function renderChips() {
      clearElement(chips)
      if (state.search) {
        chips.appendChild(
          createChip('Busca: ' + state.search, function () {
            state.search = ''
            if (searchField) searchField.setValue('')
            renderChips()
            notify()
          }),
        )
      }
      Object.keys(state.values).forEach(function (name) {
        var value = state.values[name]
        if (value === '' || value === undefined || value === null) return
        var filter = findFilterByName(name)
        var option = findOptionByValue(filter && filter.options, value)
        chips.appendChild(
          createChip((filter ? filter.label : name) + ': ' + (option ? option.label : value), function () {
            state.values[name] = ''
            selects[name].setValue('')
            renderChips()
            notify()
          }),
        )
      })
    }

    function getState() {
      return {
        search: state.search,
        values: Object.assign({}, state.values),
      }
    }

    function notify() {
      emitChange(settings.onChange, getState())
    }

    renderChips()

    return createInstance(wrapper, {
      getState: getState,
      setFilter: function (name, value) {
        if (!selects[name]) return
        state.values[name] = value
        selects[name].setValue(value)
        renderChips()
        notify()
      },
      setSearch: function (value) {
        state.search = value || ''
        if (searchField) searchField.setValue(state.search)
        renderChips()
        notify()
      },
    })
  }

  function createGrid(config) {
    var settings = Object.assign(
      {
        rows: [],
        bordered: true,
      },
      config || {},
    )
    var grid = createElement(
      'div',
      buildClassName(['gumw-grid', settings.bordered ? 'is-bordered' : '', settings.className]),
    )

    toArray(settings.rows).forEach(function (row) {
      var rowItems = Array.isArray(row) ? row : row.cells || []
      var rowNode = createElement('div', 'gumw-grid-row')
      rowNode.style.gridTemplateColumns = rowItems
        .map(function (cell) {
          return cell.width || 'minmax(0, 1fr)'
        })
        .join(' ')

      rowItems.forEach(function (cell) {
        var cellNode = createElement('div', 'gumw-grid-cell')
        if (cell.align) cellNode.style.textAlign = cell.align
        if (cell.className) cellNode.classList.add(cell.className)
        appendContent(cellNode, cell.content)
        rowNode.appendChild(cellNode)
      })

      grid.appendChild(rowNode)
    })

    return grid
  }

  function createProgressBar(config) {
    var settings = Object.assign(
      {
        value: 25,
        max: 100,
        color: 'blue',
      },
      config || {},
    )
    var wrapper = createElement('div', buildClassName(['gumw-progress', settings.className]))
    var track = createElement('div', 'gumw-progress-track')
    var fill = createElement('div', 'gumw-progress-fill')
    var label = createElement('div', 'gumw-progress-label')
    fill.style.background = getThemeColor(settings.color)
    track.appendChild(fill)
    wrapper.appendChild(track)
    wrapper.appendChild(label)

    function setValue(value) {
      var percent = Math.max(0, Math.min(100, Math.round((Number(value) / Number(settings.max)) * 100)))
      fill.style.width = percent + '%'
      label.textContent = percent + '%'
    }

    setValue(settings.value)

    return createInstance(wrapper, {
      setValue: setValue,
    })
  }

  function createTabs(config) {
    var settings = Object.assign(
      {
        items: [],
      },
      config || {},
    )
    var wrapper = createElement('div', buildClassName(['gumw-tabs', settings.className]))
    var nav = createElement('div', 'gumw-tabs-nav')
    var body = createElement('div', 'gumw-tabs-body')
    wrapper.appendChild(nav)
    wrapper.appendChild(body)

    function activate(index) {
      Array.prototype.slice.call(nav.children).forEach(function (button, buttonIndex) {
        button.classList.toggle('is-active', buttonIndex === index)
      })
      Array.prototype.slice.call(body.children).forEach(function (panel, panelIndex) {
        panel.hidden = panelIndex !== index
      })
      emitChange(settings.onChange, {
        index: index,
        item: settings.items[index],
      })
    }

    toArray(settings.items).forEach(function (item, index) {
      var tab = createButton({
        content: item.label,
        appearance: 'ghost',
        color: 'greyishBlue',
        size: 'small',
        className: 'gumw-tab-button',
        onClick: function () {
          activate(index)
        },
      })
      nav.appendChild(tab)

      var panel = createElement('div', 'gumw-tab-panel')
      appendContent(panel, item.content)
      panel.hidden = true
      body.appendChild(panel)
    })

    activate(settings.activeIndex || 0)

    return createInstance(wrapper, {
      activate: activate,
    })
  }

  function ensureOverlayRoot() {
    var root = document.querySelector('[data-gumw-overlay-root]')
    if (root) return root
    root = createElement('div', 'gumw-overlay-root')
    root.setAttribute('data-gumw-overlay-root', 'true')
    document.body.appendChild(root)
    return root
  }

  function createModal(config) {
    var settings = Object.assign(
      {
        title: 'Modal',
        closeLabel: 'Fechar',
        actions: [],
        footer: null,
        footerMessage: '',
        color: 'blue',
        inverted: false,
        size: 'small',
        customSize: null,
        loading: false,
        closeOnEsc: false,
        closeOnClickOutside: false,
        beforeClose: null,
        contentPadding: '21px',
      },
      config || {},
    )
    var mountPoint = createElement('div', 'gumw-modal-anchor')
    var overlay = createElement('div', 'gumw-modal-overlay')
    var dialog = createElement('div', 'gumw-modal')
    var header = createElement('div', 'gumw-modal-header')
    var title = createElement('h2', 'gumw-modal-title')
    appendContent(title, settings.title)
    var closeButton = createButton({
      content: createIcon({ icon: 'close', size: 16 }),
      appearance: 'ghost',
      color: 'grey',
      size: 'mini',
      onClick: close,
    })
    header.appendChild(title)
    if (settings.showCloseButton) header.appendChild(closeButton)
    dialog.appendChild(header)

    var body = createElement('div', 'gumw-modal-body')
    var content = createElement('div', 'gumw-modal-content')
    body.appendChild(content)
    dialog.appendChild(body)

    var footer = createElement('div', 'gumw-modal-footer')
    var footerMessage = createElement('div', 'gumw-modal-footer-message')
    var footerButtons = createElement('div', 'gumw-modal-footer-buttons')
    footer.appendChild(footerMessage)
    footer.appendChild(footerButtons)
    dialog.appendChild(footer)

    overlay.appendChild(dialog)
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay && settings.closeOnClickOutside) close()
    })

    var isOpen = false
    var footerActions = toArray(settings.footer && settings.footer.length ? settings.footer : settings.actions)

    function applyDimensions() {
      var sizeConfig =
        settings.size === 'custom'
          ? settings.customSize || {}
          : MODAL_SIZES[settings.size] || MODAL_SIZES.small

      dialog.style.width = sizeConfig.width || '642.5px'
      dialog.style.height = sizeConfig.height || '356.4px'
      dialog.style.maxWidth = 'calc(100vw - 40px)'
      dialog.style.maxHeight = 'calc(100vh - 40px)'
    }

    function applyHeaderTheme() {
      header.style.backgroundColor = settings.inverted
        ? getContrastColor(settings.color, 'white', 'black')
        : getThemeColor(settings.color)
      header.style.color = settings.inverted
        ? getThemeColor(settings.color)
        : getContrastColor(settings.color, 'white', 'black')
      title.style.color = 'inherit'
    }

    function renderContent() {
      clearElement(content)
      content.style.padding = settings.contentPadding || '21px'
      body.classList.toggle('is-loading', !!settings.loading)

      if (settings.loading) {
        content.appendChild(
          createLoader({
            color: settings.color || 'blue',
            size: '48px',
            bgColor: 'lightestGrey',
          }),
        )
        return
      }

      appendContent(content, settings.content || settings.body || '')
    }

    function renderFooter() {
      clearElement(footerMessage)
      clearElement(footerButtons)

      if (settings.footerMessage) appendContent(footerMessage, settings.footerMessage)
      else footerMessage.textContent = ''

      if (footerActions.length === 0) {
        footerButtons.appendChild(
          createButton({
            content: 'OK',
            color: settings.color || 'blue',
            onClick: function () {
              close()
            },
          }),
        )
        return
      }

      footerActions.forEach(function (action) {
        footerButtons.appendChild(
          createButton({
            content: action.label || action.content,
            appearance: action.appearance || 'solid',
            color: action.color || settings.color || 'blue',
            size: action.size || 'small',
            loading: !!action.loading,
            disabled: !!action.disabled,
            onClick: function (event) {
              if (typeof action.onClick === 'function') action.onClick(event, instance)
              if (action.closeOnClick === true) close()
            },
          }),
        )
      })
    }

    function onEsc(event) {
      if (!isOpen) return
      if (settings.closeOnEsc && event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }

    function open() {
      if (isOpen) return
      ensureOverlayRoot().appendChild(overlay)
      document.body.classList.add('gumw-has-overlay')
      document.addEventListener('keydown', onEsc)
      isOpen = true
    }

    function close() {
      if (!isOpen) return
      if (typeof settings.beforeClose === 'function' && settings.beforeClose(instance) === false) return
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay)
      document.body.classList.remove('gumw-has-overlay')
      document.removeEventListener('keydown', onEsc)
      isOpen = false
    }

    applyDimensions()
    applyHeaderTheme()
    renderContent()
    renderFooter()

    var instance = createInstance(mountPoint, {
      open: open,
      close: close,
      body: body,
      overlay: overlay,
      setTitle: function (value) {
        settings.title = value || ''
        clearElement(title)
        appendContent(title, settings.title)
      },
      setContent: function (value) {
        settings.content = value
        renderContent()
      },
      setLoading: function (value) {
        settings.loading = !!value
        renderContent()
      },
      setFooterMessage: function (value) {
        settings.footerMessage = value || ''
        renderFooter()
      },
      setFooterActions: function (value) {
        footerActions = toArray(value)
        renderFooter()
      },
    })

    return instance
  }

  function ensureToastContainer() {
    var node = document.querySelector('[data-gumw-toast-root]')
    if (node) return node
    node = createElement('div', 'gumw-toast-root')
    node.setAttribute('data-gumw-toast-root', 'true')
    document.body.appendChild(node)
    return node
  }

  function createToastManager(config) {
    var settings = Object.assign(
      {
        placement: 'top-right',
      },
      config || {},
    )
    var anchor = createElement('div', 'gumw-toast-anchor')
    var container = ensureToastContainer()
    container.setAttribute('data-placement', settings.placement)

    function show(payload) {
      var toast = createElement(
        'div',
        buildClassName(['gumw-toast', 'gumw-toast-' + (payload.type || 'info')]),
      )
      if (payload.title) {
        var title = createElement('div', 'gumw-toast-title')
        appendContent(title, payload.title)
        toast.appendChild(title)
      }
      var body = createElement('div', 'gumw-toast-message')
      appendContent(body, payload.message || payload.content || '')
      toast.appendChild(body)
      container.appendChild(toast)

      setTimeout(function () {
        toast.classList.add('is-visible')
      }, 10)

      setTimeout(function () {
        toast.classList.remove('is-visible')
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast)
        }, 240)
      }, payload.duration || 3200)
    }

    return createInstance(anchor, {
      show: show,
    })
  }

  function createPlaceholder(config) {
    var settings = Object.assign(
      {
        variant: 'card',
        lines: 3,
      },
      config || {},
    )
    var wrapper = createElement(
      'div',
      buildClassName(['gumw-placeholder', 'gumw-placeholder-' + settings.variant, settings.className]),
    )

    if (settings.variant === 'table') {
      for (var rowIndex = 0; rowIndex < (settings.rows || 4); rowIndex += 1) {
        var row = createElement('div', 'gumw-placeholder-row')
        for (var columnIndex = 0; columnIndex < (settings.columns || 4); columnIndex += 1) {
          row.appendChild(createElement('span', 'gumw-skeleton gumw-skeleton-line'))
        }
        wrapper.appendChild(row)
      }
      return wrapper
    }

    if (settings.variant === 'avatar') {
      wrapper.appendChild(createElement('span', 'gumw-skeleton gumw-skeleton-avatar'))
    }

    for (var lineIndex = 0; lineIndex < settings.lines; lineIndex += 1) {
      var line = createElement('span', 'gumw-skeleton gumw-skeleton-line')
      if (lineIndex === settings.lines - 1) line.style.width = '62%'
      wrapper.appendChild(line)
    }

    return wrapper
  }

  function createZoom(config) {
    var settings = Object.assign(
      {
        alt: 'Imagem',
      },
      config || {},
    )
    var image = createElement('img', buildClassName(['gumw-zoom-image', settings.className]))
    image.src = settings.src
    image.alt = settings.alt
    var modal = createModal({
      title: settings.title || settings.alt || 'Zoom',
      content: html(
        '<div class="gumw-zoom-modal"><img src="' +
          String(settings.src) +
          '" alt="' +
          String(settings.alt || '') +
          '" /></div>',
      ),
    })
    image.addEventListener('click', function () {
      modal.open()
    })
    return createInstance(image, {
      open: modal.open,
      close: modal.close,
    })
  }

  function createSignature(config) {
    var settings = Object.assign(
      {
        width: 480,
        height: 180,
      },
      config || {},
    )
    var wrapper = createElement('div', buildClassName(['gumw-signature', settings.className]))
    var canvas = createElement('canvas', 'gumw-signature-canvas')
    canvas.width = settings.width
    canvas.height = settings.height
    wrapper.appendChild(canvas)
    var footer = createElement('div', 'gumw-signature-footer')
    var clear = createButton({
      content: 'Limpar',
      appearance: 'ghost',
      color: 'grey',
      size: 'small',
      onClick: clearCanvas,
    })
    footer.appendChild(clear)
    wrapper.appendChild(footer)

    var context = canvas.getContext('2d')
    context.lineWidth = 2
    context.lineCap = 'round'
    context.strokeStyle = getThemeColor(settings.color || 'darkBlue')
    var drawing = false

    function point(event) {
      var rect = canvas.getBoundingClientRect()
      var clientX = event.touches ? event.touches[0].clientX : event.clientX
      var clientY = event.touches ? event.touches[0].clientY : event.clientY
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    }

    function start(event) {
      drawing = true
      var current = point(event)
      context.beginPath()
      context.moveTo(current.x, current.y)
    }

    function move(event) {
      if (!drawing) return
      event.preventDefault()
      var current = point(event)
      context.lineTo(current.x, current.y)
      context.stroke()
    }

    function end() {
      drawing = false
    }

    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }

    canvas.addEventListener('mousedown', start)
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mouseup', end)
    canvas.addEventListener('mouseleave', end)
    canvas.addEventListener('touchstart', start, { passive: false })
    canvas.addEventListener('touchmove', move, { passive: false })
    canvas.addEventListener('touchend', end)

    return createInstance(wrapper, {
      canvas: canvas,
      clear: clearCanvas,
      toDataURL: function () {
        return canvas.toDataURL('image/png')
      },
    })
  }

  global.FinacUIMWCore = {
    theme: THEME,
    html: html,
    mount: mount,
    createButton: createButton,
    createCalendar: createCalendar,
    createCard: createCard,
    createFilters: createFilters,
    createGrid: createGrid,
    createIcon: createIcon,
    createIndicator: createIndicator,
    createInput: createInput,
    createLink: createLink,
    createLoader: createLoader,
    createMenu: createMenu,
    createModal: createModal,
    createPlaceholder: createPlaceholder,
    createProgressBar: createProgressBar,
    createSelect: createSelect,
    createSignature: createSignature,
    createTabs: createTabs,
    createTextArea: createTextArea,
    createToastManager: createToastManager,
    createZoom: createZoom,
  }
})(window)
