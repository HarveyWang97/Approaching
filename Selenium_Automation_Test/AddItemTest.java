package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class AddItemTest {
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
  public void testAddItem() throws Exception {
    driver.get("http://localhost:3001/dashboard");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='nike shoes'])[1]/following::i[1]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Click Here to Upload a Picture ...'])[1]/following::input[1]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Nanjing'])[1]/following::input[1]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Nanjing'])[1]/following::input[1]")).clear();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Nanjing'])[1]/following::input[1]")).sendKeys("Textbook");
    driver.findElement(By.cssSelector("svg.css-19bqh2r")).click();
    driver.findElement(By.id("react-select-4-option-1")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='home / bedroom'])[1]/following::button[1]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Facebook onsite'])[2]/following::div[3]")).click();
    driver.findElement(By.cssSelector("div.submit > span.popup_icon > svg.svg-inline--fa.fa-save.fa-w-14.fa-lg")).click();
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-save.fa-w-14.fa-lg")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='>'])[1]/following::span[1]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Desk'])[1]/following::span[1]")).click();
    driver.findElement(By.cssSelector("svg.svg-inline--fa.fa-times.fa-w-11.fa-lg")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='nike shoes'])[1]/following::i[2]")).click();
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
