/* tslint:disable:no-string-literal no-construct */
import {ModelField} from '../interfaces/modelField';

class FieldType {
  static typesArray = {};

  constructor() {
    FieldType.typesArray['Number'] = ['Number'];
    FieldType.typesArray['Boolean'] = ['Boolean'];
    FieldType.typesArray['String'] = ['String'];
    FieldType.typesArray['array<Number>'] = [['Number']];
    FieldType.typesArray['array<String>'] = [['String']];
    FieldType.typesArray['array<Boolean>'] = [['Boolean']];
  }

  getTypesArray(): any {
    return FieldType.typesArray;
  }

  addType(type: string, fields: ModelField[]): void {
    FieldType.typesArray[type] = this.recursiveModel(fields, []);
    FieldType.typesArray[`array<${type}>`] = [this.recursiveModel(fields, [])];
    console.log(FieldType.typesArray);
  }

  recursiveModel(fields: ModelField[], object: any): any {
    console.log(fields);
    for (const field of fields) {
      if (this.simpleField(field.fieldType)) {
        const fieldType = field.fieldType;
        object.push({name: field.name, fieldType});
        continue;
      }
      if (this.arrayField(field.fieldType)) {
        const getTypeOfArray = field.fieldType.slice(field.fieldType.indexOf('<') + 1, field.fieldType.indexOf('>'));
        if (this.simpleField(getTypeOfArray)) {
          object.push([{name: field.name, fieldType: getTypeOfArray}]);
        }
        else {
          object.push([{
            name: field.name,
            fieldType: field.fieldType,
            fieldContents: this.recursiveModel(FieldType.typesArray[field.fieldType][0][0], [])
          }]);
        }
        continue;
      }
      object.push({
        name: field.name,
        fieldType: field.fieldType,
        fieldContents: this.recursiveModel(FieldType.typesArray[field.fieldType][0], [])
      });
    }
    return object;
  }

  simpleField(field: string): boolean {
    return field === 'Number' || field === 'String' || field === 'Boolean';
  }

  arrayField(field: string): boolean {
    return field.startsWith('array');
  }

  deleteType(type: string): void {
    delete FieldType.typesArray[type];
  }
}

const FieldTypeInstance = new FieldType();

export default FieldTypeInstance;
