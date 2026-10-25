import {test,expect} from '@playwright/test';

test.skip(!process.env.FOLIOCOVE_PAGES_TEST,'Public catalog checks use the Pages build.');

test('Catalog filters recover from empty searches and remain immediate for keyboard users',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');await expect(page.getByTestId('file-input')).toBeEnabled();
  await expect(page.getByRole('button',{name:'Everyday tools',exact:true})).toHaveCount(0);
  await expect(page.getByRole('button',{name:'All tools',exact:true})).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#core-tools a:visible')).toHaveCount(36);
  await expect(page.locator('.sidebar .tool:visible')).toHaveCount(88);
  await expect(page.locator('.category-indicator')).toHaveCount(1);
  await page.getByRole('button',{name:'Convert',exact:true}).click();
  await expect(page.getByRole('button',{name:'Convert',exact:true})).toHaveAttribute('aria-pressed','true');
  const matching=page.locator('#core-tools a:visible');
  expect(await matching.count()).toBeGreaterThan(0);expect(await matching.count()).toBeLessThan(36);
  await page.locator('#discover-search').fill('no-such-pdf-task');
  await expect(page.locator('#empty-browse')).toBeVisible();
  await page.getByRole('button',{name:'Clear search and filters',exact:true}).click();
  await expect(page.locator('#discover-search')).toBeFocused();
  await expect(page.locator('#core-tools a:visible')).toHaveCount(36);
  await expect(page.locator('.sidebar .tool:visible')).toHaveCount(88);
  const organize=page.getByRole('button',{name:'Organize',exact:true});
  await organize.focus();await page.keyboard.press('Enter');
  await expect(organize).toBeFocused();await expect(organize).toHaveAttribute('aria-pressed','true');
  expect(await page.locator('.category-indicator').evaluate(element=>getComputedStyle(element).transitionDuration)).toBe('0s');
  await expect(page.locator('#empty-browse')).toBeHidden();
  expect(errors).toEqual([]);
});

test('Reduced motion keeps the catalog, file selection and reading pages usable',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');await expect(page.getByTestId('file-input')).toBeEnabled();
  await page.getByRole('button',{name:'Convert',exact:true}).click();
  await expect(page.locator('#core-tools [data-tool-card=docx]')).toBeVisible();
  expect(await page.locator('.category-indicator').evaluate(element=>getComputedStyle(element).transitionDuration)).toBe('0s');
  expect(await page.evaluate(()=>document.getAnimations().filter(animation=>animation.playState==='running').length)).toBe(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.goto('/split-pdf/');await expect(page.getByTestId('file-input')).toBeEnabled();
  await page.getByRole('button',{name:'Try sample PDF',exact:true}).click();
  await expect(page.locator('#files .file')).toHaveCount(1);
  expect(await page.evaluate(()=>document.getAnimations().filter(animation=>animation.playState==='running').length)).toBe(0);
  await page.goto('/testing/');await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
