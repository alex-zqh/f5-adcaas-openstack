import {
  WafpolicyRepository,
  ApplicationRepository,
} from '../../src/repositories';
import {Wafpolicy} from '../../src/models';
import {Application} from '../../src/models';
import {v4 as uuid} from 'uuid';
import {WafApplication} from '../../src';

export async function givenEmptyDatabase(wafapp: WafApplication) {
  const wafpolicyrepo = await wafapp.getRepository(WafpolicyRepository);
  await wafpolicyrepo.deleteAll();

  const apprepo = await wafapp.getRepository(ApplicationRepository);
  await apprepo.deleteAll();
}

export function createWafpolicyObject(data?: Partial<Wafpolicy>) {
  return Object.assign(
    {
      id: uuid(),
      name: 'test waf policy',
      content:
        '<?xml version="1.0" encoding="utf-8"?>' + '<policy>any</policy>',
      shared: false,
      tenant: ['adminz'],
      created_at: '2019-01-21T05:03:45.502Z',
    },
    data,
  );
}

export async function givenWafpolicyData(
  wafapp: WafApplication,
  data?: Partial<Wafpolicy>,
) {
  const wafpolicyrepo = await wafapp.getRepository(WafpolicyRepository);
  return await wafpolicyrepo.create(createWafpolicyObject(data));
}

export function createApplicationObject(data?: Partial<Application>) {
  return Object.assign(
    {
      id: uuid(),
      name: 'test application',
      description: 'application test data',
      declaration: '{"class": "ADC"}',
      status: 'Done',
      created_at: '2019-01-22T05:03:45.502Z',
      updated_at: '2019-01-23T05:03:45.502Z',
      wafpolicy_id: '4225f224-df91-30b2-258c0e766b2a',
    },
    data,
  );
}

export async function givenApplicationData(
  wafapp: WafApplication,
  data?: Partial<Application>,
) {
  const apprepo = await wafapp.getRepository(ApplicationRepository);
  return await apprepo.create(createApplicationObject(data));
}
