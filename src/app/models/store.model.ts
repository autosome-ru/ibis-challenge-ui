export interface loadableData<T> {
  data: T | null,
  loading: boolean,
  loaded: boolean
}

export const loadingDataLaunched = <T>(): loadableData<T> => {
  return {
    data: null,
    loading: true,
    loaded: false
  }
}

export const loadingDataSuccess = <T>(data: T): loadableData<T> => {
  return {
    data: data,
    loading: false,
    loaded: true
  }
}

export const loadingDataFailure = <T>(): loadableData<T> => {
  return {
    data: null,
    loading: false,
    loaded: false
  }
}

export const loadingDataInitial = loadingDataFailure;

