import { dirname } from 'node:path'

import {
  getPackages as getPackagesFunc,
  getPackagesSync as getPackagesSyncFunc,
} from '@manypkg/get-packages'
import { findUpSync } from 'find-up'

/**
 * 查找 Monorepo 的根目录
 * @param cwd
 */
function findMonorepoRoot(cwd: string = process.cwd()) {
  const lockFile = findUpSync(
    ['pnpm-lock.yaml', 'yarn.lock', 'package-lock.json'],
    {
      cwd,
      type: 'file',
    },
  )
  return dirname(lockFile || '')
}

/**
 * 获取 Monorepo 的所有包
 */
function getPackagesSync() {
  const root = findMonorepoRoot()
  return getPackagesSyncFunc(root)
}

/**
 * 获取 Monorepo 的所有包
 */
async function getPackages() {
  const root = findMonorepoRoot()

  return await getPackagesFunc(root)
}

/**
 * 获取 Monorepo 指定的包
 */
async function getPackage(pkgName: string) {
  const { packages } = await getPackages()
  return packages.find(pkg => pkg.packageJson.name === pkgName)
}

export { findMonorepoRoot, getPackage, getPackages, getPackagesSync }
