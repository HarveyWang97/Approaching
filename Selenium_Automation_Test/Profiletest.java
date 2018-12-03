package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class Profiletest {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "https://www.katalon.com/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testProfile() throws Exception {
    driver.get("http://localhost:3001/");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Approaching'])[2]/following::button[1]")).click();
    // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_1 | ]]
    driver.close();
    // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_local | ]]
    driver.findElement(By.cssSelector("path")).click();
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-pen.fa-w-16.fa-lg")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Account Settings'])[1]/following::input[1]")).clear();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Account Settings'])[1]/following::input[1]")).sendKeys("123@gmail.com");
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-save.fa-w-14.fa-lg")).click();
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-pen.fa-w-16.fa-lg")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Account Settings'])[1]/following::input[2]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Account Settings'])[1]/following::input[2]")).clear();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Account Settings'])[1]/following::input[2]")).sendKeys("10");
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-save.fa-w-14.fa-lg")).click();
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-times.fa-w-11.fa-lg > path")).click();
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
