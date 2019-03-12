package kl.socialnetwork;

import kl.socialnetwork.repositories.RoleRepository;
import kl.socialnetwork.services.RoleService;
import kl.socialnetwork.servicesImpl.RoleServiceImpl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

import static org.hamcrest.core.Is.is;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class RoleServiceTests {

    @Autowired
    public RoleRepository roleRepository;

    @Test
    public void roleService_testMethodWithCorrectValues_ReturnsCorrect() throws IOException {
        RoleService roleService = new RoleServiceImpl(this.roleRepository);


        String actual = roleService.testMethod("test");
        String expected = "true";

//        Assert.assertThat(expected, is(actual));
        Assert.assertEquals(expected, actual);

    }
}