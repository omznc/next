import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
    server: {},
    client: {},
    runtimeEnv: {},
});

export default env;