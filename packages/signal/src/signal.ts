type SignalListener<TPayload = void> = (
  payload: TPayload,
) => void

export interface Signal<TPayload = void> {
  add(listener: SignalListener<TPayload>): void
  remove(listener: SignalListener<TPayload>): void
  has(listener: SignalListener<TPayload>): boolean
  hasAny(): boolean
  broadcast(payload: TPayload): void
  removeAll(): void
  live: boolean
}

export function Signal<TPayload = void>(
  live = true,
): Signal<TPayload> {
  let listeners: SignalListener<TPayload>[] = []
  let isLive: boolean = live

  const has = (
    listener: SignalListener<TPayload>,
  ): boolean => {
    return listeners.includes(listener)
  }

  const hasAny = (): boolean => {
    return listeners.length > 0
  }

  const add = (
    listener: SignalListener<TPayload>,
  ): void => {
    if (!has(listener)) {
      listeners.push(listener)
    }
  }

  const remove = (
    listener: SignalListener<TPayload>,
  ): void => {
    const idx: number = listeners.indexOf(listener)
    if (idx >= 0) {
      listeners.splice(idx, 1)
    }
  }

  const broadcast = (payload: TPayload): void => {
    if (!isLive || !hasAny()) {
      return
    }
    for (const listener of listeners) {
      listener(payload)
    }
  }

  const removeAll = () => {
    listeners = []
  }

  return {
    has,
    hasAny,
    add,
    remove,
    broadcast,
    removeAll,
    get live(): boolean {
      return isLive
    },
    set live(val: boolean) {
      isLive = val
    },
  }
}
