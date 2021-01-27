/* tslint:disable:no-string-literal no-construct */
import {ModelField} from '../interfaces/modelField';

class FieldType {
  static typesArray = {};

  constructor() {
    FieldType.typesArray['Number'] = 'Number';
    FieldType.typesArray['Boolean'] = 'Boolean';
    FieldType.typesArray['String'] = 'String';
    FieldType.typesArray['array<Number>'] = ['Number'];
    FieldType.typesArray['array<String>'] = ['String'];
    FieldType.typesArray['array<Boolean>'] = ['Boolean'];
  }

  getTypesArray(): any {
    return FieldType.typesArray;
  }

  addType(type: string, fields: ModelField[]): void {
    FieldType.typesArray[type] = fields.map(field => [field.name, field.fieldType]);
    FieldType.typesArray[`array<${type}>`] = [FieldType.typesArray[type]];
    console.log(FieldType.typesArray);
  }

  deleteType(type: string): void {
    delete FieldType.typesArray[type];
    delete FieldType.typesArray[`array<${type}>`];
  }
}

const FieldTypeInstance = new FieldType();

export default FieldTypeInstance;
