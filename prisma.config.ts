import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { PrismaPg } from '@prisma/adapter-pg'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    async adapter() {
      return new PrismaPg({
        connectionString: 'postgresql://postgres:aurum1234@localhost:51213/aurum_db',
      })
    },
  },
})