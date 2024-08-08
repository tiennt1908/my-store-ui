export const ARRAY_UTILS = {
  toMap: <T>(list: T[], field: string) => {
    const length = list.length;
    let i = 0;
    const result: any = {};
    for (i = 0; i < length; i++) {
      const key = list[i][field as keyof T];
      result[key] = list[i];
    }
    return result as {
      [key: string | number]: T;
    };
  },
  toMapList: <T>(list: T[], field: string) => {
    const length = list.length;
    let i = 0;
    const result: any = {};
    for (i = 0; i < length; i++) {
      const key = list[i][field as keyof T];
      if (result[key]) {
        result[key].push(list[i]);
      } else {
        result[key] = [list[i]];
      }
    }
    return result as {
      [key: string | number]: T[];
    };
  },
};
