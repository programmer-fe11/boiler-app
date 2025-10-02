import { TypeParamsBody } from '@/components/dto/customField.dto';
import { InjectionKey } from 'vue';

export const InjectKeyForm: InjectionKey<TypeParamsBody> = Symbol();
