package kl.tennisshop.domain.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Payment  extends BaseEntity {
    private BigDecimal amount;
    private LocalDateTime entryDate;
    private User user;
    private String paymentType;
    private String bankName;
    private Long cardNum;
    private Integer CCV;
    private String SWIFT;
    private String BIC;
    private Order order;

    public Payment() {
        this.entryDate = LocalDateTime.now();
    }

    public Payment(BigDecimal amount, User user, String paymentType, String bankName, Order order) {
        this.amount = amount;
        this.user = user;
        this.paymentType = paymentType;
        this.bankName = bankName;
        this.entryDate = LocalDateTime.now();
        this.order = order;
    }

    // BiDirectional
    //    @OneToOne(optional = false, mappedBy = "payment", targetEntity = Order.class,
    //            fetch = FetchType.EAGER, cascade = CascadeType.MERGE)

    //UniDirectional
    @OneToOne(optional = false, cascade = CascadeType.MERGE, fetch = FetchType.EAGER, targetEntity = Order.class)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    public Order getOrder() {
        return this.order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    public BigDecimal getAmount() {
        return this.amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @Column(name = "entry_date")
    public LocalDateTime getEntryDate() {
        return this.entryDate;
    }

    public void setEntryDate(LocalDateTime entryDate) {
        this.entryDate = entryDate;
    }


    @Column(name = "payment_type", nullable = false)
    public String getPaymentType() {
        return this.paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    @Column(name = "bank_name", nullable = false)
    public String getBankName() {
        return this.bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    @Column(name = "card_number")
    public Long getCardNum() {
        return this.cardNum;
    }

    public void setCardNum(Long cardNum) {
        this.cardNum = cardNum;
    }

    @Column(name = "ccv")
    public Integer getCCV() {
        return this.CCV;
    }

    public void setCCV(Integer CCV) {
        this.CCV = CCV;
    }

    @Column(name = "swift")
    public String getSWIFT() {
        return this.SWIFT;
    }

    public void setSWIFT(String SWIFT) {
        this.SWIFT = SWIFT;
    }

    @Column(name = "bic")
    public String getBIC() {
        return this.BIC;
    }

    public void setBIC(String BIC) {
        this.BIC = BIC;
    }
}
