package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class EditEventTest {
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
  public void testEditEvent() throws Exception {
    driver.get("http://localhost:3001/dashboard");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Facebook onsite'])[1]/following::div[6]")).click();
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-pen.fa-w-16.fa-lg")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Click Here to Upload a Picture ...'])[1]/following::input[1]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Click Here to Upload a Picture ...'])[1]/following::input[1]")).clear();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Click Here to Upload a Picture ...'])[1]/following::input[1]")).sendKeys("get offer");
    driver.findElement(By.id("timepicker")).click();
    driver.findElement(By.id("timepicker")).click();
    driver.findElement(By.id("timepicker")).clear();
    driver.findElement(By.id("timepicker")).sendKeys("2018-12-21T12:00");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Click Here to Upload a Picture ...'])[1]/following::input[3]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Click Here to Upload a Picture ...'])[1]/following::input[3]")).clear();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Click Here to Upload a Picture ...'])[1]/following::input[3]")).sendKeys("Santa Monica");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='add'])[1]/following::button[1]")).click();
    driver.findElement(By.cssSelector("span.jss15 > svg > g > path")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='nike shoes'])[2]/following::div[2]")).click();
    driver.findElement(By.cssSelector("div.submit > span.popup_icon > svg.svg-inline--fa.fa-save.fa-w-14.fa-lg")).click();
    driver.findElement(By.name("newItem")).click();
    driver.findElement(By.name("newItem")).clear();
    driver.findElement(By.name("newItem")).sendKeys("swag");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Click Here to Upload a Picture ...'])[1]/following::button[1]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Nanjing'])[1]/following::div[6]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='swag'])[1]/following::label[1]")).click();
    driver.findElement(By.id("file")).clear();
    driver.findElement(By.id("file")).sendKeys("C:\\fakepath\\samsommer-258898-unsplash.jpg");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Upload a file'])[1]/following::div[2]")).click();
    driver.findElement(By.cssSelector("div.submit > span.popup_icon > svg.svg-inline--fa.fa-save.fa-w-14.fa-lg > path")).click();
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-save.fa-w-14.fa-lg > path")).click();
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-times.fa-w-11.fa-lg")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Facebook onsite'])[1]/following::div[6]")).click();
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
