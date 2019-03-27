//package kl.socialnetwork.web.controllers;
//
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.ArgumentCaptor;
//import org.softuni.cardealer.domain.entities.Part;
//import org.softuni.cardealer.domain.entities.Supplier;
//import org.softuni.cardealer.domain.models.service.PartServiceModel;
//import org.softuni.cardealer.repository.PartRepository;
//import org.softuni.cardealer.repository.SupplierRepository;
//import org.softuni.cardealer.service.PartService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.List;
//
//import static org.hamcrest.Matchers.is;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest
//@AutoConfigureMockMvc
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
//public class PartControllerTests {
//
//    @Autowired
//    private MockMvc mvc;
//
//    @Autowired
//    private SupplierRepository supplierRepository;
//
//    @Autowired
//    private PartRepository partRepository;
//
//    @Autowired
//    private PartService partService;
//
//    @Test
//    @WithMockUser
//    public void addPart_ReturnsCorrectView() throws Exception {
//        Supplier supplier = new Supplier();
//        supplier.setName("pesho");
//        supplier.setIsImporter(false);
//
//        Supplier savedSupplier = this.supplierRepository.saveAndFlush(supplier);
//
////        Part part = new Part();
////        part
////
////        this.partRepository.save()
//
//        this.mvc
//                .perform(post("/parts/add")
//                .param("name", "part1")
//                .param("price", "100")
//                .param("supplier", savedSupplier.getName()))
//                .andExpect(view().name("redirect:/parts/all"))
//                .andExpect(redirectedUrl("/parts/all"));
//
//        List<Part> parts = this.partRepository.findAll();
//
//        Part actual = this.partRepository.findAll().get(0);
//
//        Assert.assertEquals(1, this.partRepository.count());
////        Assert.assertEquals("pesho", actual.getName());
////        Assert.assertFalse(actual.getIsImporter());
//
//        ArgumentCaptor<PartServiceModel> formObjectArgument = ArgumentCaptor.forClass(PartServiceModel.class);
//        verify(this.partService, times(1) ).savePart(formObjectArgument.capture());
//        verifyNoMoreInteractions(this.partService);
//
//        PartServiceModel formObject = formObjectArgument.getValue();
//        Assert.assertThat(formObject.getName(), is("part1"));
//        Assert.assertThat(formObject.getPrice(), is("100"));
//        Assert.assertThat(formObject.getSupplier().getName(), is(savedSupplier.getName()));
//
//    }
//
//
//    @Test
//    public void fetch_ReturnsCorrectView(){
//
//    }

//    @Test
//    @WithMockUser("spring")
//    public void fetch_worksCorrectly() throws Exception {
//        Supplier first = new Supplier();
//        first.setName("pesho");
//        first.setIsImporter(false);
//
//        Supplier firstSuppl = this.supplierRepository.saveAndFlush(first);
//
//        String contentAsString = this.mvc
//                .perform(get("/suppliers/fetch"))
//                .andExpect(status().isOk())
//                .andReturn().getResponse().getContentAsString();
//
//        String expected = "[{\"id\":\"" + firstSuppl.getId() + "\",\"name\":\"pesho\",\"isImporter\":false}]";
//
//        Assert.assertEquals(expected, contentAsString);
//    }



//@Test
//@WithMockUser("spring")
//public void fetch_worksCorrectlyJsonPath() throws Exception {
//        SupplierServiceModel first = new SupplierServiceModel();
//        first.setId("1");
//        first.setName("pesho");
//        first.setIsImporter(false);
//
//        SupplierServiceModel second = new SupplierServiceModel();
//        second.setId("2");
//        second.setName("gosho");
//        second.setIsImporter(true);
//
//        when(this.supplierServiceMock.findAll()).thenReturn(Arrays.asList(first, second));
//
//        this.mvc
//        .perform(get("/suppliers/fetch"))
//        .andExpect(status().isOk())
//        .andExpect(content().contentType("application/json;charset=UTF-8"))
//        .andExpect(jsonPath("$", hasSize(2)))
//        .andExpect(jsonPath("$[0].id", is("1")))
//        .andExpect(jsonPath("$[0].name", is("pesho")))
//        .andExpect(jsonPath("$[0].isImporter", is(false)))
//        .andExpect(jsonPath("$[1].id", is("2")))
//        .andExpect(jsonPath("$[1].name", is("gosho")))
//        .andExpect(jsonPath("$[1].isImporter", is(true)));
//
//        verify(this.supplierServiceMock, times(1)).findAll();
//        verifyNoMoreInteractions(this.supplierServiceMock);
//        }
//}
