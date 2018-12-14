import {isArray} from 'rxjs/internal-compatibility';
import {ICustomSelect} from '../interfaces/i-custom-select';

export class HelperClass {

  public static flatten(tmpArr: any[]) {
    const newArr = tmpArr.map((value) => {
      return value['key'];
    });
    return newArr.join(', ');
  }

  public static valIsArray(val): string {
    if (isArray(val)) {
      const tmpVal = val as ICustomSelect[];
      return this.flatten(tmpVal);
    }
    return val;
  }
}
